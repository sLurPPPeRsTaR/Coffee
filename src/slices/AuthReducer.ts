import { createReducer } from '@reduxjs/toolkit';

import { signIn } from '@action-creators/AuthActionCreator';

export interface AuthState {
  userToken: null | string;
}

const initialState: AuthState = {
  userToken: null,
};

const authReducer = createReducer(initialState, builder => {
  builder.addCase(signIn, (state, action) => {
    state.userToken = action.payload;
  });
});

export default authReducer;
