import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap, takeUntil } from 'rxjs/operators';
import { nftToCertif } from './certif';
import {
  emptyAction,
  getCertif,
  getCertifs,
  getCertifsSuccess,
  loadCertif,
  searchNFT,
  uploadCompletedAction,
  uploadFailureAction,
  uploadRequestAction,
  uploadRequestActionLoad,
  uploadRequestActionPre
} from './certif.actions';
import { selectSelectedCertif } from './certif.reducer';
import { CertifService } from './certif.services';

@Injectable()
export class CertifEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private certifService: CertifService
  ) {}

  // NFT
  searchNFT$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchNFT),
      mergeMap((p) =>
        this.certifService.retrieveCertif(p.id).pipe(
          map((nft) => {
            return loadCertif({ certif: nftToCertif(p.id, nft) });
          })
        )
      )
    )
  );

  getCertif$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCertif),
      mergeMap((p) =>
        this.store.select(selectSelectedCertif).pipe(
          map((c) => {
            console.log('getCertif$');
            console.log(c);
            if (c !== null) return loadCertif({ certif: c });
            else {
              from(this.certifService.getCertif(p.id)).pipe(
                map((c) => {
                  return loadCertif({ certif: c });
                })
              );
            }
          })
        )
      )
    )
  );

  getCertifs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCertifs),
      mergeMap((p) =>
        this.certifService
          .getCertifs(p.id)
          .pipe(map((r) => getCertifsSuccess({ certifs: r })))
      )
    )
  );

  uploadRequestEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(uploadRequestAction),
      mergeMap((p) =>
        this.certifService.uploadFile(p.file).pipe(
          /*takeUntil(
            this.actions$.pipe(
              ofType(fromFileUploadActions.ActionTypes.UPLOAD_CANCEL)
            )
          ), */
          map((event) => this.getActionFromHttpEvent(event)),
          catchError((error) =>
            of(uploadFailureAction({ error: JSON.stringify(error) }))
          )
        )
      )
    )
  );

  private getActionFromHttpEvent(event: HttpEvent<any>) {
    switch (event.type) {
      case HttpEventType.Sent: {
        return uploadRequestActionPre();
      }
      case HttpEventType.UploadProgress: {
        return uploadRequestActionLoad({
          perc: Math.round((100 * event.loaded) / event.total)
        });
      }

      case HttpEventType.Response: {
        if (event.status === 200) {
          console.log(event.body.IpfsHash);
          return uploadCompletedAction({
            url: this.certifService.getPinataUrl(event.body.IpfsHash)
          });
        }
        /*else {
          return new fromFileUploadActions.UploadFailureAction({
            error: event.statusText
          });
        } */
      }

      default: {
        return emptyAction();
      }
    }
  }
}
