export type AuthState = {
  authenticated: boolean | null;
  loading: boolean;
  token: string | null;
  user: DB_User | null;
  msg: Error[] | [];
};

export type ProviderProps = {
  children: JSX.Element | JSX.Element[];
};

export type RegUser = {
  name: string;
  email: string;
  password: string;
};

export type LogUser = {
  email: string;
  password: string;
};

export type Error = {
  msg: string;
  param: string;
};

export type DB_User = RegUser & {
  date: string;
  __v: number;
  _id: string;
};

export type AuthError = {
  type: 'error';
  error: Error[];
};

export type AuthSuccess<T> = {
  type: 'success';
  value: T;
};

export type AuthResult<T> = AuthSuccess<T> | AuthError;
