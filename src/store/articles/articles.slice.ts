import { ArticleDTO } from "../../model/article/dto/article.dto";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RejectedAction } from "../store-type";
import {
  createArticleThunk,
  fetchAllArticlesThunk,
  fetchArticleThunk,
  updateArticleThunk,
} from "./articlse.thunk";

export interface ArticleState {
  loading: boolean;
  error?: string;
  articlesList: ArticleDTO[];
  article?: ArticleDTO;
}

const initialState: ArticleState = {
  loading: true,
  articlesList: [],
};

const ArticleSlice = createSlice({
  name: "articles",
  initialState: initialState,
  reducers: {
    clearError: (state) => {
      state.error = undefined;
    },
    removeArticle: (state, action: PayloadAction<ArticleDTO>) => {
      state.articlesList = state.articlesList.filter(
        (article) => article.id !== action.payload.id
      );
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => [
    builder.addCase(fetchAllArticlesThunk.pending, (state) => {
      state.loading = true;
    }),
    builder.addCase(fetchAllArticlesThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.articlesList = payload;
    }),
    builder.addCase(fetchArticleThunk.pending, (state, { payload }) => {
      state.loading = true;
      state.article = payload;
    }),
    builder.addCase(fetchArticleThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.article = payload;
    }),
    builder.addCase(createArticleThunk.pending, (state, { payload }) => {
      state.loading = true;
    }),
    builder.addCase(createArticleThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      if (payload) state.articlesList.unshift(payload);
    }),
    builder.addCase(updateArticleThunk.pending, (state, { payload }) => {
      state.loading = true;
    }),
    builder.addCase(updateArticleThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.articlesList = state.articlesList.map((article) => {
        if (article.id === payload.id) return payload;
        return article;
      });
    }),
    builder.addMatcher(
      (action): action is RejectedAction =>
        action.type.startsWith("articles/") &&
        action.type.endsWith("/rejected"),
      (state, { payload }) => {
        state.loading = false;
        state.error = payload! as string;
      }
    ),
  ],
});

export const { clearError, resetState, removeArticle } = ArticleSlice.actions;

export default ArticleSlice.reducer;
