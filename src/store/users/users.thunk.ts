import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteUser, getAllUsers } from "./users.service";
import { UserDTO } from "../../model/user/dto/user.dto";

export const fetchAllUserThunk = createAsyncThunk<
  UserDTO[],
  undefined,
  { rejectValue: string }
>("users/fetch-all-user", async (_, { rejectWithValue }) => {
  try {
    const result = await getAllUsers();
    return result;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const deleteUserThunk = createAsyncThunk<
  void,
  { email: string },
  { rejectValue: string }
>("articles/delete-article", async ({ email }, { rejectWithValue }) => {
  try {
    return await deleteUser(email);
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});
