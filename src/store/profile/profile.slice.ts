import { createSlice } from "@reduxjs/toolkit";
import { RejectedAction } from "../store-type";
import { fetchProfileThunk, updateProfileThunk } from "./profile.thunk";
import { UserDTO } from "../../model/user/dto/user.dto";

export interface ProfileState {
  loading: boolean;
  error?: string;
  myProfile?: UserDTO;
}

const initialState: ProfileState = {
  loading: true,
};

const ProfileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    clearError: (state) => {
      state.error = undefined;
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => [
    builder.addCase(fetchProfileThunk.fulfilled, (state, { payload }) => {
      state.myProfile = payload;
    }),
    builder.addCase(updateProfileThunk.fulfilled, (state, { payload }) => {
      state.myProfile = payload;
    }),
    builder.addMatcher(
      (action): action is RejectedAction =>
        action.type.startsWith("profile/") && action.type.endsWith("/rejected"),
      (state, { payload }) => {
        state.loading = false;
        state.error = payload! as string;
      }
    ),
  ],
});

export const { clearError, resetState } = ProfileSlice.actions;

export default ProfileSlice.reducer;
