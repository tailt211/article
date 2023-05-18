import { API } from "../../https";
import { ArticleDTO } from "../../model/article/dto/article.dto";
import {
  ArticleResponse,
  ArticlesResponse,
} from "../../model/article/response/article.response";

export interface ArticleRequest {
  title: string;
  description: string;
  body: string;
}

export const getAllArticles = async () => {
  try {
    const data = (await API.get<ArticlesResponse>("/articles")).data;
    return {
      articles: data.articles.map((article) => {
        return {
          id: article.id,
          slug: article.slug,
          title: article.title,
          description: article.title,
          body: article.body,
          created: article.created,
          updated: article.updated,
          tagList: article.tagList,
          favoriteCount: article.favoriteCount,
          author: article.author
            ? {
                id: article.author.id,
                username: article.author.username,
                email: article.author.email,
                bio: article.author.bio,
                image: article.author.image,
              }
            : null,
        } as ArticleDTO;
      }),
      articlesCount: data.articlesCount,
    };
  } catch (err) {
    console.error(err);
    throw new Error("Result is undefined");
  }
};

export const getArticle = async (slug: string) => {
  try {
    const data = (await API.get<ArticleResponse>(`/articles/${slug}`)).data;
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("Result is undefined");
  }
};

export const createArticle = async (body: ArticleRequest) => {
  try {
    const data = (await API.post<ArticleDTO>("/articles", body)).data;
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("Result is undefined");
  }
};

export const updateArticle = async (slug: string, body: ArticleRequest) => {
  try {
    const data = (await API.put<ArticleResponse>(`/articles/${slug}`, body))
      .data;
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("Result is undefined");
  }
};

export const deleteArticle = async (slug: string) => {
  try {
    await API.delete<void>(`/articles/${slug}`);
  } catch (err) {
    console.error(err);
    throw new Error("Result is undefined");
  }
};
