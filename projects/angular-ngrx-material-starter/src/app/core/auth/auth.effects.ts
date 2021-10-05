import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { from } from 'rxjs';
import { map, mapTo, mergeMap, switchMap, tap } from 'rxjs/operators';
import { ProviderServices } from '../ethers/provider.services';

import { LocalStorageService } from '../local-storage/local-storage.service';
import { loadStakeDaoPoolsSuccess } from '../stake-dao/stake-dao.actions';
import { StakeDaoServices } from '../stake-dao/stake-dao.services';
import { authLogin, authLoginSuccess, authLogout } from './auth.actions';

export const AUTH_KEY = 'AUTH';

@Injectable()
export class AuthEffects {
  login = createEffect(() =>
    this.actions$.pipe(
      ofType(authLogin),
      mergeMap(() =>
        from(this.providerServices.connect()).pipe(
          map((v) => {
            console.log('Hey ' + JSON.stringify(v));
            return authLoginSuccess({ accountInfo: v });
          })
        )
      )
    )
  );

  logout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLogout),
        tap(() => {
          this.router.navigate(['']);
          this.localStorageService.setItem(AUTH_KEY, {
            isAuthenticated: false
          });
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private providerServices: ProviderServices,
    private router: Router
  ) {}
}
