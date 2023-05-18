export interface UserDTO {
  id: number;
  username: string;
  email: string;
  bio?: string | null;
  image?: string | null;
}
