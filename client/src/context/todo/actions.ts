import { Todo } from '../../types';

export type Actions =
  | { type: 'filter' }
  | { type: 'resetEdit' }
  | { type: 'getTodo'; payload: Todo }
  | { type: 'addTodo'; payload: Todo }
  | { type: 'addTodoEdited'; payload: Todo }
  | { type: 'deleteTodo'; payload: { id: string } }
  | { type: 'toggleTodo'; payload: { id: string } };
