import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProfile, login, register } from "./auth.service";
import { AccountDTO } from "../../model/account/dto/account.dto";

export const loginThunk = createAsyncThunk<
  AccountDTO,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const result = await login(email, password);
    return result.user;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const RegisterThunk = createAsyncThunk<
  AccountDTO,
  { username: string; email: string; password: string },
  { rejectValue: string }
>(
  "auth/register",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const result = await register(username, email, password);
      return result.user;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchAccountThunk = createAsyncThunk<
  AccountDTO,
  undefined,
  { rejectValue: string }
>("auth/fetch-user", async (_, { rejectWithValue }) => {
  try {
    const result = await getUserProfile();
    return result.user;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});
