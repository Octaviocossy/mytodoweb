import { Todo } from './types';

export type Actions =
  | { type: 'addTodo'; payload: Todo }
  | { type: 'deleteTodo'; payload: { id: string } }
  | { type: 'toggleTodo'; payload: { id: string } };
