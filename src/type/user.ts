declare global {
  namespace Express {
    interface Request {
      user: User | undefined;
      err?: Error| undefined;
    }
  }
}

interface Error {
  status?: number;
  error?: string;
}

export interface User {
  id?: number | string | undefined;
  email: string;
  hashedPassword?: string;
}

export interface UserReply {
  id?: number | string | undefined;
  email: string;
}
