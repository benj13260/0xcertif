import { Action, createReducer, on } from '@ngrx/store';
import { stakeDaoInOutStateInit, StakeDaoState } from './stake-dao.types';
import * as MainActions from './stake-dao.actions';

export const mainFeatureKey = 'main';

export const initialState: StakeDaoState = {
  stakeDaoPoolsState: [],
  stakeDaoInOutState: stakeDaoInOutStateInit
};

export const reducer = createReducer(
  initialState,

  on(MainActions.loadStakeDaoPoolsSuccess, (state, { data }) => ({
    ...state,
    stakeDaoPoolsState: data
  })),

  on(MainActions.loadStakeDaoPoolSuccess, (state, { poolId, data }) => ({
    ...state,
    stakeDaoPoolsState: [
      ...state.stakeDaoPoolsState,
      {
        id: poolId,
        loading: false,
        balance: data.balance,
        pricePerShare: data.pricePerShare,
        sdtoken: data.sdtoken,
        token: data.token,
        totalSupply: data.totalSupply,
        stakeDaoPoolInfo: data.stakeDaoPoolInfo
      }
    ]
  })),

  on(MainActions.removeStakeDaoPool, (state, { poolId }) => ({
    ...state,
    stakeDaoPoolsState: state.stakeDaoPoolsState.filter(
      (item) => item.id !== poolId
    )
  })),

  on(MainActions.loadStakeDaoPoolInvSuccess, (state, { data }) => ({
    ...state,
    stakeDaoPoolInv: data
  })),

  on(MainActions.loadStakeDaoPoolFailure, (state, { error }) => ({
    ...state,
    error: { title: 'Load generic data', val: error }
  })),
  on(MainActions.loadStakeDaoPoolInvFailure, (state, { error }) => ({
    ...state,
    error: { title: 'Load Investment data', val: error }
  })),

  on(MainActions.loadStakeDaoInOutSuccess, (state, { data }) => ({
    ...state,
    stakeDaoInOutState: data
  }))
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
