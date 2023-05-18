import { API } from "../../https";
import { ArticleResponse } from "../../model/article/response/article.response";
import { CommentResponse } from "../../model/comment/response/comment.response";

export const getAllComment = async (slug: string) => {
  try {
    const data = (await API.get<CommentResponse>(`/articles/${slug}/comments`))
      .data;
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("Result is undefined");
  }
};

export const postComment = async (slug: string, body: string) => {
  try {
    const data = (
      await API.post<ArticleResponse>(`/articles/${slug}/comments`, {
        body: body,
      })
    ).data;
    return data.article;
  } catch (err) {
    console.error(err);
    throw new Error("Result is undefined");
  }
};

export const deleteComment = async (id: number, slug: string) => {
  try {
    const data = (
      await API.delete<ArticleResponse>(`/articles/${slug}/comments/${id}`)
    ).data;
    return data.article;
  } catch (err) {
    console.error(err);
    throw new Error("Result is undefined");
  }
};
