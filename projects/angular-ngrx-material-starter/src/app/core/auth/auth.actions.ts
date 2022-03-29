import { createAction, props } from '@ngrx/store';
import { AccountInfo, AuthState } from './auth.models';

export const authLogin = createAction('[Auth] Login');
export const authLoginSuccess = createAction(
  '[Auth] Login Success',
  props<{ accountInfo: AccountInfo }>()
);

export const authLoginFail = createAction('[Auth] Login Fail');

export const authLogout = createAction('[Auth] Logout');
