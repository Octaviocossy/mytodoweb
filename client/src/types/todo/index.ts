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

export type Error = {
  config: Object;
  data: Object;
  headers: Object;
  request: Object;
  status: number;
  statusText: string;
};
