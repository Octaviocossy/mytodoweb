import { createContext } from 'react';
import { Todo, TodoState } from '../types';

export type TodoContextProps = {
  deleteTodo: (id: string) => void;
  addTodo: (todo: Todo) => void;
  todoState: TodoState;
};

const TodoContext = createContext<TodoContextProps>({} as TodoContextProps);

export default TodoContext;
