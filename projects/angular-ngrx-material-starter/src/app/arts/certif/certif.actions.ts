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

export const getCertif = createAction(
  '[View Certif Page Certif] Get Certif',
  props<{ id: string }>()
);

export const getCertifs = createAction(
  '[View Certif List Certifs] Get Certifs',
  props<{ id: string }>()
);

export const getCertifsSuccess = createAction(
  '[View Certif List Certifs Success] Get Certifs Success',
  props<{ certifs: Certif[] }>()
);

export const reloadCertif = createAction('[Reload Certif Page] Reload Certif');

export const searchNFT = createAction(
  '[Search Certif Page] Search Certif',
  props<{ addr: string; id: string }>()
);

export const searchNFTSuccess = createAction(
  '[Search Certif Success] Search Certif Success',
  props<{ certifs: Certif[] }>()
);

export const removeAllCertif = createAction(
  '[RemoveAll Certif Page] RemoveAll Certif'
);

// Upload File Actions

export const uploadRequestActionInit = createAction(
  '[Upload Image Init] Upload request Init'
);

export const uploadRequestActionPre = createAction(
  '[Upload Image Pre] Upload request Pre'
);

export const uploadRequestActionLoad = createAction(
  '[Upload Image Load] Upload request Load',
  props<{ perc: number }>()
);
export const uploadRequestAction = createAction(
  '[Upload Image] Upload request',
  props<{ file: File }>()
);

export const uploadCompletedAction = createAction(
  '[Upload Image Success] Upload request completed',
  props<{ url: string }>()
);

export const uploadFailureAction = createAction(
  '[Upload Image Fail] Upload request failed',
  props<{ error: string }>()
);

export const displayImgAction = createAction(
  '[Display Image] Display image',
  props<{ img: ArrayBuffer }>()
);

export const emptyAction = createAction('[Empty Action] Empty action');
