import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, takeUntil } from 'rxjs/operators';
import { nftToCertif } from './certif';
import {
  emptyAction,
  loadCertif,
  searchCertif,
  uploadCompletedAction,
  uploadFailureAction,
  uploadRequestAction,
  uploadRequestActionLoad,
  uploadRequestActionPre
} from './certif.actions';
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

  uploadRequestEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(uploadRequestAction),
      mergeMap((p) =>
        this.nftService.uploadFile(p.file).pipe(
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
            url: this.nftService.getPinataUrl(event.body.IpfsHash)
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
