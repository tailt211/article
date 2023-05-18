import { createSlice } from "@reduxjs/toolkit";
import { RejectedAction } from "../store-type";
import { AccountDTO } from "../../model/account/dto/account.dto";
import { RegisterThunk, fetchAccountThunk, loginThunk } from "./auth.thunk";

export interface AuthState {
  loading: boolean;
  error?: string;
  token?: string;
  myAccount?: AccountDTO;
}

const initialState: AuthState = {
  loading: true,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    clearError: (state) => {
      state.error = undefined;
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => [
    builder.addCase(loginThunk.pending, (state) => {
      state.loading = true;
    }),
    builder.addCase(loginThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      if (payload) {
        state.token = payload.token;
        state.myAccount = payload;
      }
    }),
    builder.addCase(RegisterThunk.pending, (state) => {
      state.loading = true;
    }),
    builder.addCase(RegisterThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      if (payload) {
        state.token = payload.token;
        state.myAccount = payload;
      }
    }),
    builder.addCase(fetchAccountThunk.fulfilled, (state, { payload }) => {
      state.myAccount = payload;
    }),
    builder.addMatcher(
      (action): action is RejectedAction =>
        action.type.startsWith("auth/") && action.type.endsWith("/rejected"),
      (state, { payload }) => {
        state.loading = false;
        state.error = payload! as string;
      }
    ),
  ],
});

export const { clearError, resetState } = AuthSlice.actions;

export default AuthSlice.reducer;
