import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef
} from '@angular/core';

import { Store } from '@ngrx/store';
import { interval, Observable, of, Subject } from 'rxjs';
import { debounce, map, switchMap, take } from 'rxjs/operators';
import { ROUTE_ANIMATIONS_TITLE } from '../../../core/animations/route.animations';

import { FindBookPageActions } from '../actions';
import { Book } from '../models';
import * as fromBooks from '../reducers';

@Component({
  selector: 'bc-find-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <bc-book-search
        [query]="searchQuery$ | async"
        [searching]="loading$ | async"
        [error]="error$ | async"
        (search)="search($event)"
      >
      </bc-book-search>
      <bc-book-preview-list [books]="books$ | async" cdkScrollable>
      </bc-book-preview-list>
    </div>
  `
})
export class FindBookPageComponent {
  searchQuery$: Observable<string>;
  books$: Observable<Book[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  query: string;

  scrollingSubscription: any;

  startIndex = 0;
  numberOfTicks = 0;

  constructor(
    public scroll: ScrollDispatcher,
    private el: ElementRef,
    private store: Store,
    private ref: ChangeDetectorRef
  ) {
    this.searchQuery$ = store.select(fromBooks.selectSearchQuery).pipe(take(1));
    this.books$ = store.select(fromBooks.selectAll); //selectSearchResults);
    this.loading$ = store.select(fromBooks.selectSearchLoading);
    this.error$ = store.select(fromBooks.selectSearchError);

    setInterval(() => {
      this.numberOfTicks++;
      // require view to be updated
      this.ref.markForCheck();
    }, 1000);

    this.scrollingSubscription = this.scroll
      .scrolled()
      .pipe(debounce((i) => interval(200)))
      .subscribe((data: CdkScrollable) => {
        console.log(data.measureScrollOffset('bottom'));
        console.log(data.elementScrolled);
        console.log(this.el.nativeElement.offsetHeight);

        if (
          data.measureScrollOffset('bottom') < 200 &&
          this.searchQuery$ != null
        ) {
          this.startIndex += 10;

          let q = 'a&startIndex=' + this.startIndex;
          this.store.dispatch(FindBookPageActions.loadNextBooks({ query: q }));
        }
      });
  }

  search(query: string) {
    this.store.dispatch(FindBookPageActions.searchBooks({ query }));
  }
}
