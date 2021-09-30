import { ValueTransformer } from '@angular/compiler/src/util';
import { Action, ActionReducer, createReducer, MetaReducer, on } from '@ngrx/store';
import { stakeDaoInOutStateInit, stakeDaoPoolStateInit, StakeDaoState } from './stake-dao.types';
import * as MainActions from './stake-dao.actions';
import { immerOn } from 'ngrx-immer/store';

import { environment } from '../../../../src/environments/environment';
import produce from 'immer';

export const mainFeatureKey = 'main';

export const initialState: StakeDaoState = {
  stakeDaoPoolsState : [],
  stakeDaoInOutState : stakeDaoInOutStateInit
};


export const reducer = createReducer(
  initialState,

  on(MainActions.loadStakeDaoPoolsSuccess, (state, {data}) => ({ ...state, stakeDaoPoolsState: data })),

  immerOn(MainActions.loadStakeDaoPoolSuccess, (state, { poolId, data}) => {
    state.stakeDaoPoolsState[poolId].loading = false;
    state.stakeDaoPoolsState[poolId].balance = data.balance;
    state.stakeDaoPoolsState[poolId].pricePerShare = data.pricePerShare;
    state.stakeDaoPoolsState[poolId].sdtoken = data.sdtoken;
    state.stakeDaoPoolsState[poolId].token = data.token;
    state.stakeDaoPoolsState[poolId].totalSupply = data.totalSupply;

   } ),
    
    
  on(MainActions.loadStakeDaoPoolInvSuccess, (state,{data}) => ({ ...state, stakeDaoPoolInv: data })),

  on(MainActions.loadStakeDaoPoolFailure, (state,{error}) => ({ ...state, error: { title: 'Load generic data', val: error} })),
  on(MainActions.loadStakeDaoPoolInvFailure, (state,{error}) => ({ ...state, error: { title: 'Load Investment data', val: error} })),

  on(MainActions.loadStakeDaoInOutSuccess, (state,{data}) => ({ ...state, stakeDaoInOutState : data }))

);

export function stakeDaoReducer(
  state: StakeDaoState | undefined,
  action: Action
) {
  return reducer(state, action);
}

/*
export function logger(reducer: ActionReducer<StakeDaoState>): ActionReducer<StakeDaoState> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();
    return result;
  };
}

export const metaReducers: MetaReducer<StakeDaoState>[] = !environment.production
  ? [logger]
  : [];
  */