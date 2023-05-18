import { CommentDTO } from "../../comment/dto/comment.dto";

export interface AuthorDTO {
  id: number;
  username: string;
  email: string;
  bio: string | null;
  image: string | null;
}

export interface ArticleDTO {
  id: number;
  slug: string;
  title: string;
  description: string;
  body?: string;
  created: number;
  updated: number;
  tagList?: string[];
  favoriteCount?: number;
  author?: AuthorDTO;
  comments?: CommentDTO[];
}
