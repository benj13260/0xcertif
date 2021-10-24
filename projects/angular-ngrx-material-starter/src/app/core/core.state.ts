import {
  ActionReducerMap,
  MetaReducer,
  createFeatureSelector
} from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { environment } from '../../environments/environment';

import { initStateFromLocalStorage } from './meta-reducers/init-state-from-local-storage.reducer';
import { debug } from './meta-reducers/debug.reducer';
import { AuthState } from './auth/auth.models';
import { authReducer } from './auth/auth.reducer';
import { RouterStateUrl } from './router/router.state';
import { settingsReducer } from './settings/settings.reducer';
import { stakeDaoReducer } from './stake-dao/stake-dao.reducer';

import { SettingsState } from './settings/settings.model';
import { StakeDaoState } from './stake-dao/stake-dao.types';
import { bookReducers, BooksState } from '../arts/books/reducers';
import { certifReducers, CertifsState } from '../arts/certif/certif.reducer';

export interface AppState {
  auth: AuthState;
  settings: SettingsState;
  stakeDao: StakeDaoState;
  books: BooksState;
  certifs: CertifsState;
  router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  settings: settingsReducer,
  stakeDao: stakeDaoReducer,
  books: bookReducers,
  router: routerReducer,
  certifs: certifReducers
};

export const metaReducers: MetaReducer<AppState>[] = [
  initStateFromLocalStorage
];

if (!environment.production) {
  if (!environment.test) {
    metaReducers.unshift(debug);
  }
}

export const selectAuthState = createFeatureSelector<AppState, AuthState>(
  'auth'
);

export const selectSettingsState = createFeatureSelector<
  AppState,
  SettingsState
>('settings');

export const selectRouterState = createFeatureSelector<
  AppState,
  RouterReducerState<RouterStateUrl>
>('router');

export const selectStakeDAOState = createFeatureSelector<
  AppState,
  RouterReducerState<RouterStateUrl>
>('stakeDao');

export const selectBooksState = createFeatureSelector<
  AppState,
  RouterReducerState<RouterStateUrl>
>('books');

export const selectCertifsState = createFeatureSelector<
  AppState,
  RouterReducerState<RouterStateUrl>
>('certifs');
