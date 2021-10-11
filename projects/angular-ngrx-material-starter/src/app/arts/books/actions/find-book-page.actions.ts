import { createAction, props } from '@ngrx/store';

export const searchBooks = createAction(
  '[Find Book Page] Search Books',
  props<{ query: string }>()
);

export const loadNextBooks = createAction(
  '[Load Next Book] Load Next Books',
  props<{ query: string }>()
);
