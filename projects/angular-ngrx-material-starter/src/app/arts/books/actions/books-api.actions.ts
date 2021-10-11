import { createAction, props } from '@ngrx/store';

import { Book } from '../models';

export const searchSuccess = createAction(
  '[Books/API] Search Success',
  props<{ books: Book[] }>()
);

export const searchCleanupSuccess = createAction(
  '[Books/API] Search Cleanup Success'
);

export const searchFailure = createAction(
  '[Books/API] Search Failure',
  props<{ errorMsg: string }>()
);

export const loadNextSuccess = createAction(
  '[Books/API] Load Next Success',
  props<{ books: Book[] }>()
);

export const loadNextFailure = createAction(
  '[Books/API] Load Next Failure',
  props<{ errorMsg: string }>()
);
