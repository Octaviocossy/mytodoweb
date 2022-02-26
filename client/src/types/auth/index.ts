export type AuthState = {
  token: string | null;
  authenticated: boolean | null;
  msg: Error[] | null;
  user: DB_User | null;
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
  value: string;
  msg: string;
  param: string;
  location: string;
};

export type DB_User = RegUser & {
  date: string;
  __v: number;
  _id: string;
};
