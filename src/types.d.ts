import { User } from './entities/user';

declare namespace Express {
  export interface Request {
    user?: User;
  }
}
