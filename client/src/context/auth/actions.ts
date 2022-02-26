import { DB_User, Error } from '../../types/auth';

export type Actions =
  | { type: 'regSuccess'; payload: string }
  | { type: 'logSuccess'; payload: string }
  | { type: 'regFailed'; payload: Error[] }
  | { type: 'logFailed'; payload: Error[] }
  | { type: 'getUser'; payload: DB_User }
  | { type: 'logOut' };
