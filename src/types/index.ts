import { IconType } from 'react-icons';

export type Todo = {
  id: string;
  title: string;
  desc: string;
  completed: boolean;
};

export type TodoState = {
  todoCount: number;
  todos: Todo[];
  completed: Todo[];
  pending: Todo[];
};
