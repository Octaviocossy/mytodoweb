import { createContext } from 'react';

import { DB_Todo, Todo, TodoState } from '../../types/todo';

interface Props {
  getATodoForEdit: (todo: DB_Todo) => void;
  deleteAllTodos: () => void;
  addTodoEdited: (todo: DB_Todo) => void;
  deleteTodo: (id: string) => void;
  resetEdit: () => void;
  getTodos: () => void;
  addTodo: (todo: Todo) => void;
  filter: () => void;
  todoState: TodoState;
}

const TodoContext = createContext<Props>({} as Props);

export default TodoContext;
