import { User } from "./user";

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