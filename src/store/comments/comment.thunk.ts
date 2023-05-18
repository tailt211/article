import { createAsyncThunk } from "@reduxjs/toolkit";
import { CommentDTO } from "../../model/comment/dto/comment.dto";
import { deleteComment, getAllComment, postComment } from "./comment.service";

export const fetchAllCommentsThunk = createAsyncThunk<
  CommentDTO[],
  { slug: string },
  { rejectValue: string }
>("comments/fetch-all-comments", async ({ slug }, { rejectWithValue }) => {
  try {
    const result = await getAllComment(slug);
    return result.comments;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const postCommentThunk = createAsyncThunk<
  CommentDTO[],
  { slug: string; body: string },
  { rejectValue: string }
>("comments/post-comment", async ({ slug, body }, { rejectWithValue }) => {
  try {
    const result = await postComment(slug, body);
    return result.comments || [];
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const deleteCommentThunk = createAsyncThunk<
  CommentDTO[],
  { id: number; slug: string },
  { rejectValue: string }
>("comments/delete-comment", async ({ id, slug }, { rejectWithValue }) => {
  try {
    const result = await deleteComment(id, slug);
    return result.comments || [];
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});
