import {User} from './User.interface';

export interface AuthResponse {
  user: User;
  token: string;
}
