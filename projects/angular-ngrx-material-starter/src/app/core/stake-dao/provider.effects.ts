import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { authLogin } from '../auth/auth.actions';
import { ProviderServices } from './provider.services';

@Injectable()
export class ProviderEffects {
  constructor(
    private actions$: Actions,
    private providerServices: ProviderServices
  ) {}
  // Load pools
  connect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLogin),
        tap(() => this.providerServices.connectAccount())
      ),
    { dispatch: false }
  );
}
