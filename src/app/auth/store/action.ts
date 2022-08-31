import { createAction, props } from '@ngrx/store';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { ActionTypes } from './ActionTypes';

export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<{ request: RegisterRequestInterface }>()
);

export const stepAction = createAction(
  ActionTypes.STEPS,
  props<{steps: Array<string> }>()
);