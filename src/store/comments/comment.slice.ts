import { createSlice } from "@reduxjs/toolkit";
import { RejectedAction } from "../store-type";
import { CommentDTO } from "../../model/comment/dto/comment.dto";
import {
  deleteCommentThunk,
  fetchAllCommentsThunk,
  postCommentThunk,
} from "./comment.thunk";

export interface CommentState {
  loading: boolean;
  error?: string;
  commentList: CommentDTO[];
}

const initialState: CommentState = {
  loading: true,
  commentList: [],
};

const CommentsSlice = createSlice({
  name: "comment",
  initialState: initialState,
  reducers: {
    clearError: (state) => {
      state.error = undefined;
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => [
    builder.addCase(fetchAllCommentsThunk.pending, (state, { payload }) => {
      state.loading = true;
    }),
    builder.addCase(fetchAllCommentsThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.commentList = payload;
    }),
    builder.addCase(postCommentThunk.pending, (state, { payload }) => {
      state.loading = true;
    }),
    builder.addCase(postCommentThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.commentList = payload;
    }),
    builder.addCase(deleteCommentThunk.pending, (state, { payload }) => {
      state.loading = true;
    }),
    builder.addCase(deleteCommentThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.commentList = payload;
    }),
    builder.addMatcher(
      (action): action is RejectedAction =>
        action.type.startsWith("comment/") && action.type.endsWith("/rejected"),
      (state, { payload }) => {
        state.loading = false;
        state.error = payload! as string;
      }
    ),
  ],
});

export const { clearError, resetState } = CommentsSlice.actions;

export default CommentsSlice.reducer;
