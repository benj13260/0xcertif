import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { asyncScheduler, EMPTY as empty, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  skip,
  switchMap,
  takeUntil
} from 'rxjs/operators';

import { Book } from '../models';
import { BooksApiActions, FindBookPageActions } from '../actions';
import { GoogleBooksService } from '../services';

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class BookEffects {
  search$ = createEffect(
    () =>
      ({ debounce = 300, scheduler = asyncScheduler } = {}) =>
        this.actions$.pipe(
          ofType(FindBookPageActions.searchBooks),
          debounceTime(debounce, scheduler),
          switchMap(({ query }) => {
            if (query === '') {
              return empty;
            }

            const nextSearch$ = this.actions$.pipe(
              ofType(FindBookPageActions.searchBooks),
              skip(1)
            );

            return this.googleBooks.searchBooks(query).pipe(
              takeUntil(nextSearch$),

              switchMap((books: Book[]) => [
                BooksApiActions.searchCleanupSuccess(),
                BooksApiActions.searchSuccess({ books })
              ]),
              catchError((err) =>
                of(BooksApiActions.searchFailure({ errorMsg: err.message }))
              )
            );
          })
        )
  );

  loadNextBooks$ = createEffect(
    () =>
      ({ debounce = 300, scheduler = asyncScheduler } = {}) =>
        this.actions$.pipe(
          ofType(FindBookPageActions.loadNextBooks),
          debounceTime(debounce, scheduler),
          switchMap(({ query }) => {
            if (query === '') {
              return empty;
            }

            const nextSearch$ = this.actions$.pipe(
              ofType(FindBookPageActions.loadNextBooks),
              skip(1)
            );

            return this.googleBooks.searchBooks(query).pipe(
              takeUntil(nextSearch$),
              map((books: Book[]) =>
                BooksApiActions.loadNextSuccess({ books })
              ),
              catchError((err) =>
                of(BooksApiActions.searchFailure({ errorMsg: err.message }))
              )
            );
          })
        )
  );

  constructor(
    private actions$: Actions,
    private googleBooks: GoogleBooksService
  ) {}
}