import { ArticleDTO } from "../dto/article.dto";

export interface ArticlesResponse {
  articlesCount: number;
  articles: ArticleDTO[];
}

export interface ArticleResponse {
  article: ArticleDTO;
}
