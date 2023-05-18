import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ArticleRequest,
  createArticle,
  deleteArticle,
  getAllArticles,
  getArticle,
  updateArticle,
} from "./articles.service";
import { ArticleDTO } from "../../model/article/dto/article.dto";

export const fetchAllArticlesThunk = createAsyncThunk<
  ArticleDTO[],
  undefined,
  { rejectValue: string }
>("articles/fetch-all-articles", async (_, { rejectWithValue }) => {
  try {
    const result = await getAllArticles();
    return result.articles;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const fetchArticleThunk = createAsyncThunk<
  ArticleDTO,
  { slug: string },
  { rejectValue: string }
>("articles/fetch-article", async ({ slug }, { rejectWithValue }) => {
  try {
    const result = await getArticle(slug);
    return result.article;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const createArticleThunk = createAsyncThunk<
  ArticleDTO,
  { body: ArticleRequest },
  { rejectValue: string }
>("articles/create-article", async ({ body }, { rejectWithValue }) => {
  try {
    const result = await createArticle(body);
    return result;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const updateArticleThunk = createAsyncThunk<
  ArticleDTO,
  { slug: string; body: ArticleRequest },
  { rejectValue: string }
>("articles/update-article", async ({ slug, body }, { rejectWithValue }) => {
  try {
    const result = await updateArticle(slug, body);
    return result.article;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const deleteArticleThunk = createAsyncThunk<
  void,
  { slug: string },
  { rejectValue: string }
>("articles/delete-article", async ({ slug }, { rejectWithValue }) => {
  try {
    return await deleteArticle(slug);
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});
