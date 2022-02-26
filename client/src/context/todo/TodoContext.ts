import { createContext } from 'react';

import { Todo, TodoState } from '../../types/todo';

interface Props {
  getATodoForEdit: (todo: Todo) => void;
  addTodoEdited: (todo: Todo) => void;
  addTodoToLocalStorage: () => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  addTodo: (todo: Todo) => void;
  resetEdit: () => void;
  filter: () => void;
  todoState: TodoState;
}

const TodoContext = createContext<Props>({} as Props);

export default TodoContext;
