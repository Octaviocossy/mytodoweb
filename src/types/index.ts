export type Todo = {
  id: string;
  title: string;
  desc: string;
  completed: boolean;
};

export type TodoState = {
  todos: Todo[];
  completed: Todo[];
  pending: Todo[];
  edit: Todo[];
};
