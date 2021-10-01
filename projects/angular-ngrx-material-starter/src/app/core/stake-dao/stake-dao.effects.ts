import { Injectable } from '@angular/core';
import { CommonService } from '../ethers/common.service';

import { Contract } from '@ethersproject/contracts';

import { BigNumber, ethers, Wallet } from 'ethers';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadStakeDaoInOut,
  loadStakeDaoInOutFailure,
  loadStakeDaoInOutSuccess,
  loadStakeDaoPool,
  loadStakeDaoPoolFailure,
  loadStakeDaoPools,
  loadStakeDaoPoolsFailure,
  loadStakeDaoPoolsSuccess,
  loadStakeDaoPoolSuccess,
  removeStakeDaoPool
} from './stake-dao.actions';
import {
  catchError,
  debounceTime,
  delay,
  map,
  mapTo,
  mergeMap,
  observeOn,
  switchMap,
  throttle
} from 'rxjs/operators';
import {
  stakeDaoPoolStateInit,
  StakeDaoPoolState,
  StakeDaoPoolInfo,
  stakeDaoPoolInfoInit
} from './stake-dao.types';
import { asyncScheduler, EMPTY, from, interval, of, scheduled } from 'rxjs';
import { StakeDaoServices } from './stake-dao.services';

@Injectable()
export class StakeDaoEffects {
  constructor(
    private actions$: Actions,
    private cserv: CommonService,
    private stakeDaoServices: StakeDaoServices
  ) {}

  // Load pools
  loadStakeDaoPools$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadStakeDaoPools),
      mergeMap(() =>
        from(this.stakeDaoServices.getStakeDaoPools()).pipe(
          map((res) => loadStakeDaoPoolsSuccess({ data: res })),
          catchError((e) => {
            return of(loadStakeDaoPoolsFailure({ error: e }));
          })
        )
      )
    )
  );

  // Load Single pool
  loadStakeDaoPool$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadStakeDaoPool),
      mergeMap((data) =>
        from(this.stakeDaoServices.getStakeDaoPool(data.pool)).pipe(
          switchMap((res) => [
            removeStakeDaoPool({ poolId: res.id }),
            loadStakeDaoPoolSuccess({ poolId: res.id, data: res })
          ]),
          catchError((e) => {
            return of(loadStakeDaoPoolFailure({ error: e }));
          })
        )
      )
    )
  );

  // Load pools
  loadStakeDaoInOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadStakeDaoInOut),
      mergeMap((data) =>
        from(this.stakeDaoServices.getInOut(data.contract)).pipe(
          map((res) => {
            console.log('res : ' + res);
            return loadStakeDaoInOutSuccess({
              data: { result: res, loading: false }
            });
          }),
          catchError((e) => {
            return of(loadStakeDaoInOutFailure({ error: e }));
          })
        )
      )
    )
  );
}
