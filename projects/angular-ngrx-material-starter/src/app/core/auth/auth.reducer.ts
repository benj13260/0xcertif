import { AuthState } from './auth.models';
import { authLogin, authLoginSuccess, authLogout } from './auth.actions';
import { createReducer, on, Action } from '@ngrx/store';

export const initialState: AuthState = {
  isAuthenticated: false
};

const reducer = createReducer(
  initialState,
  on(authLoginSuccess, (state, { accountInfo }) => ({
    ...state,
    isAuthenticated: true,
    accountInfo: accountInfo
  })),
  on(authLogout, (state) => ({ ...state, isAuthenticated: false }))
);

export function authReducer(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return reducer(state, action);
}
