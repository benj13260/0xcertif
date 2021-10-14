import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { nftToCertif } from './certif';
import { loadCertif, searchCertif } from './certif.actions';
import { CertifService } from './certif.services';

@Injectable()
export class CertifEffects {
  constructor(private actions$: Actions, private nftService: CertifService) {}

  searchCertif$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchCertif),
      mergeMap((p) =>
        this.nftService.retrieveCertif(p.id).pipe(
          map((nft) => {
            return loadCertif({ certif: nftToCertif(p.id, nft) });
          })
        )
      )
    )
  );

  //

  /*
          mergeMap((p) => 
            
              this.nftService.retrieveCertif("1").pipe(
                map(c => {
                    console.log("c"+JSON.stringify(c));
                    return reloadCertif();
                  })
              )
          )
           
           .pipe(
            switchMap((c) => {
              console.log("c"+JSON.stringify(c));
  
              return searchCertifSuccess({certifs : c})
            })
           )
           */
  //      )
  // );

  /*

          from(this.nftService.searchCertif(p.addr,0,10)).pipe(
              map((res) =>   searchCertifSuccess({certifs : res})),
              catchError((e) => {
                  return of(searchCertifSuccess({ certifs: []}));
              })
          )


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
    */
}
