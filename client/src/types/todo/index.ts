export type Todo = {
  title: string;
  desc?: string;
  completed: boolean;
};

export type DB_Todo = Todo & {
  creator: string;
  _id: string;
};

export type TodoState = {
  todos: DB_Todo[];
  completed: DB_Todo[];
  pending: DB_Todo[];
  edit: DB_Todo[];
  msg: string;
};

export type Err = {
  type: 'error';
  error: Error;
};

export type Success<T> = {
  type: 'success';
  value: T;
};

export type Unauthorized = {
  type: 'unauthorized';
};

export type Result<T> = Success<T> | Err | Unauthorized;
