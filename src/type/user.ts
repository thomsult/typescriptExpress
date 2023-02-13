export interface User {
  id?: number | string | undefined;
  email: string;
  hashedPassword?: string;
}

export interface UserReply {
  id?: number | string | undefined;
  email: string;
}
