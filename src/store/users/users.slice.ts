import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RejectedAction } from "../store-type";
import { UserDTO } from "../../model/user/dto/user.dto";
import { fetchAllUserThunk } from "./users.thunk";

export interface UserState {
  loading: boolean;
  error?: string;
  userList: UserDTO[];
}

const initialState: UserState = {
  loading: true,
  userList: [],
};

const UserSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    removeUser: (state, action: PayloadAction<number>) => {
      state.userList = state.userList.filter(
        (user) => user.id !== action.payload
      );
    },
    updateMyProfile: (state, action: PayloadAction<UserDTO>) => {
      state.userList = state.userList.map((user) => {
        if (user.id === action.payload.id) return action.payload;
        return user;
      });
    },
    clearError: (state) => {
      state.error = undefined;
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => [
    builder.addCase(fetchAllUserThunk.pending, (state, { payload }) => {
      state.loading = true;
    }),
    builder.addCase(fetchAllUserThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userList = payload;
    }),
    builder.addMatcher(
      (action): action is RejectedAction =>
        action.type.startsWith("users/") && action.type.endsWith("/rejected"),
      (state, { payload }) => {
        state.loading = false;
        state.error = payload! as string;
      }
    ),
  ],
});

export const { clearError, resetState, removeUser, updateMyProfile } =
  UserSlice.actions;

export default UserSlice.reducer;
