import { configureStore } from "@reduxjs/toolkit";
import articlesSlice from "./articles/articles.slice";
import authSlice from "./auth/auth.slice";
import profileSlice from "./profile/profile.slice";
import usersSlice from "./users/users.slice";
import commentSlice from "./comments/comment.slice";

export const store = configureStore({
  reducer: {
    article: articlesSlice,
    auth: authSlice,
    profile: profileSlice,
    user: usersSlice,
    comment: commentSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
