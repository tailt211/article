export interface AccountDTO {
  id: number;
  username: string;
  email: string;
  token: string;
  bio: string | null;
  image: string | null;
}
