import { DB_Todo } from '../../types/todo';

export type Actions =
  | { type: 'filter' }
  | { type: 'resetEdit' }
  | { type: 'deleteAllTodos' }
  | { type: 'getTodo'; payload: DB_Todo }
  | { type: 'addTodo'; payload: DB_Todo }
  | { type: 'errorTodo'; payload: string }
  | { type: 'getTodos'; payload: DB_Todo[] }
  | { type: 'addTodoEdited'; payload: DB_Todo }
  | { type: 'deleteTodo'; payload: { id: string } };
