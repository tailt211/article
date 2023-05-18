import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProfile, updateProfile } from "./profile.service";
import { UserDTO } from "../../model/user/dto/user.dto";

export const fetchProfileThunk = createAsyncThunk<
  UserDTO,
  undefined,
  { rejectValue: string }
>("profile/fetch-user", async (_, { rejectWithValue }) => {
  try {
    const result = await getUserProfile();
    return result.user;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const updateProfileThunk = createAsyncThunk<
  UserDTO,
  { username: string; email: string; bio: string; image: string },
  { rejectValue: string }
>(
  "profile/update-user",
  async ({ username, email, bio, image }, { rejectWithValue }) => {
    try {
      const result = await updateProfile(username, email, bio, image);
      return result;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
