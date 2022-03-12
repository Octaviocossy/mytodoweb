import { DB_User, Error } from '../../types/auth';

export type Actions =
  | { type: 'logOut' }
  | { type: 'removeAllAlerts' }
  | { type: 'getUser'; payload: DB_User }
  | { type: 'regSuccess'; payload: string }
  | { type: 'logSuccess'; payload: string }
  | { type: 'authAlert'; payload: Error[] }
  | { type: 'regFailed'; payload: Error[] }
  | { type: 'logFailed'; payload: Error[] };
