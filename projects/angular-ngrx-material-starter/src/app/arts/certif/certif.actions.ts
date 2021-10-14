import { createAction, props } from '@ngrx/store';

import { Certif } from './certif';

export const loadCertif = createAction(
  '[Load Certif] Load Certif',
  props<{ certif: Certif }>()
);

export const selectCertif = createAction(
  '[View Certif Page] Select Certif',
  props<{ id: string }>()
);

export const reloadCertif = createAction('[Reload Certif Page] Reload Certif');

export const searchCertif = createAction(
  '[Search Certif Page] Search Certif',
  props<{ addr: string; id: string }>()
);

export const searchCertifSuccess = createAction(
  '[Search Certif Success] Search Certif Success',
  props<{ certifs: Certif[] }>()
);

export const removeAllCertif = createAction(
  '[RemoveAll Certif Page] RemoveAll Certif'
);
