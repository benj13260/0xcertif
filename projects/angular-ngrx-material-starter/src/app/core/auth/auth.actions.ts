import { createAction, props } from '@ngrx/store';
import { AccountInfo, AuthState } from './auth.models';

export const authLogin = createAction('[Auth] Login');
export const authLoginSuccess = createAction(
  '[Auth] Login Success',
  props<{ accountInfo: AccountInfo }>()
);
export const authLogout = createAction('[Auth] Logout');
