import { state } from '@angular/animations';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {
  Action,
  combineReducers,
  createFeatureSelector,
  createReducer,
  createSelector,
  on
} from '@ngrx/store';
import { updateDecorator } from 'typescript';
import { Certif } from './certif';
import {
  reloadCertif,
  loadCertif,
  removeAllCertif,
  searchCertif,
  searchCertifSuccess,
  selectCertif
} from './certif.actions';

/**
 * State declaration
 */
export interface CertifEntityState extends EntityState<Certif> {}

export const adapter: EntityAdapter<Certif> = createEntityAdapter<Certif>({
  selectId: (certif: Certif) => certif.id,
  sortComparer: false
});

export const certifFeatureKey = 'certifs';

export interface RootCertifsState {
  certifs: CertifsState;
}

export interface CertifsState {
  search: {
    ids: string[];
    loading: boolean;
    error: string;
    query: string;
  };
  loaded: number;
  selectedCertifId: string;
  certifs: CertifEntityState;
}

const initialState: CertifsState = {
  search: {
    ids: [],
    loading: false,
    error: '',
    query: ''
  },
  loaded: 0,
  selectedCertifId: null,
  certifs: {
    ids: [],
    entities: {}
  }
};

/**
 * Reducers
 */

export const reducer = createReducer(
  initialState,
  /**
   * The addMany function provided by the created adapter
   * adds many records to the entity dictionary
   * and returns a new state including those records. If
   * the collection is to be sorted, the adapter will
   * sort each record upon entry into the sorted array.
   */
  on(removeAllCertif, (state) => ({
    ...state,
    certifs: adapter.removeAll(state.certifs)
  })),
  on(loadCertif, (state, { certif }) => ({
    ...state,
    loaded: state.loaded + 1,
    certifs: adapter.addOne(certif, state.certifs)
  })),
  on(searchCertifSuccess, (state, { certifs }) => ({
    ...state,
    certifs: adapter.addMany(certifs, state.certifs)
  })),
  on(reloadCertif, (state) => ({
    ...state,
    loaded: state.loaded + 1
  })),
  on(selectCertif, (state, { id }) => ({
    ...state,
    selectedCertifId: id
  }))
);

export function certifReducers(
  state: CertifsState | undefined,
  action: Action
) {
  return reducer(state, action);
}

/**
 *  Selectors
 */
export const getIds = (state: CertifsState) => state.search.ids;

export const getQuery = (state: CertifsState) => state.search.query;

export const getLoading = (state: CertifsState) => state.search.loading;

export const getError = (state: CertifsState) => state.search.error;

export const selectId = (state: CertifsState) => state.selectedCertifId;

export const selectCertifIds = (state: RootCertifsState) =>
  state.certifs.certifs.ids;

export const selectCertifsEntity = (state: RootCertifsState) => {
  return state.certifs.certifs.entities;
};

export const selectLoaded = (state) => state.loaded;

export const selectAll = createSelector(
  selectCertifsEntity,
  selectCertifIds,
  (certifs, ids) => {
    //console.log(JSON.stringify(certifs));
    // console.log(JSON.stringify(ids));
    if (certifs !== undefined && ids !== undefined)
      return ids
        .map((id) => certifs[id])
        .filter((certif): certif is Certif => certif != null);
  }
);

export const selectCertifsState =
  createFeatureSelector<CertifsState>('certifs');

export const selectCertifEntitiesState = createSelector(
  selectCertifsState,
  (state) => state.certifs
);
