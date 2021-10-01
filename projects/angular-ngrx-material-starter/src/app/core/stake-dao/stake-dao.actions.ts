import { createAction, props } from '@ngrx/store';
import {
  StakeDaoInOutState,
  StakeDaoPoolInfo,
  StakeDaoPoolState
} from './stake-dao.types';

export const loadMains = createAction('[Main] Load Mains');

// Pools
export const loadStakeDaoPools = createAction('[Main] Load stakeDaoPools');

export const loadStakeDaoPoolsSuccess = createAction(
  '[Main] Load stakeDaoPools Success',
  props<{ data: StakeDaoPoolState[] }>()
);

export const loadStakeDaoPoolsFailure = createAction(
  '[Main] Load stakeDaoPools Failure',
  props<{ error: any }>()
);

// Pool
export const loadStakeDaoPool = createAction(
  '[Main] Load stakeDaoPool',
  props<{ pool: StakeDaoPoolState }>()
);

export const loadStakeDaoPoolSuccess = createAction(
  '[Main] Load stakeDaoPool Success',
  props<{ poolId: number; data: StakeDaoPoolState }>()
);

export const removeStakeDaoPool = createAction(
  '[Main] Remove stakeDaoPool',
  props<{ poolId: number }>()
);

export const loadStakeDaoPoolFailure = createAction(
  '[Main] Load stakeDaoPool Failure',
  props<{ error: any }>()
);

//Address
export const loadAddressSuccess = createAction(
  '[Main] Load Address Success',
  props<{ data: any }>()
);

export const loadAddressFailure = createAction(
  '[Main] Load Address Failure',
  props<{ error: any }>()
);

export const loadStakeDaoPoolInvFailure = createAction(
  '[Main] Load stakeDaoPoolInv Failure',
  props<{ error: any }>()
);

export const loadStakeDaoPoolInvSuccess = createAction(
  '[Main] Load stakeDaoPoolInv Success',
  props<{ data: any }>()
);

//InOut
export const loadStakeDaoInOut = createAction(
  '[Main] Load StakeDaoInOut',
  props<{ contract: string }>()
);

export const loadStakeDaoInOutSuccess = createAction(
  '[Main] Load StakeDaoInOut Success',
  props<{ data: StakeDaoInOutState }>()
);

export const loadStakeDaoInOutFailure = createAction(
  '[Main] Load StakeDaoInOut Failure',
  props<{ error: any }>()
);
