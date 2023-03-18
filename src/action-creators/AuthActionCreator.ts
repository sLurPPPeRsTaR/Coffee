import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '@constants/ActionTypes';

export const signIn = createAction<string>(ActionType.LOGIN_SUCCEEDED);

export const signOut = createAction(ActionType.LOGOUT_SUCCEEDED);
