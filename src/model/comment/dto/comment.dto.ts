interface Author {
  id: number;
  username: string;
  email: string;
  bio?: string;
  image?: string;
  comment?: string[];
}

export interface CommentDTO {
  id: number;
  body: string;
  author: Author;
  created: number;
}
