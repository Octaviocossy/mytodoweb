import { useReducer } from 'react';
import { Todo, TodoState } from '../types';
import TodoContext from './TodoContext';
import todoReducer from './todoReducer';

const INITIAL_STATE: TodoState = {
  todoCount: 2,
  todos: [],
  completed: [],
  pending: [],
};

type props = {
  children: JSX.Element | JSX.Element[];
};

const TodoProvider = ({ children }: props) => {
  const [todoState, dispatch] = useReducer(todoReducer, INITIAL_STATE);
  const addTodo = (todo: Todo) => {
    dispatch({ type: 'addTodo', payload: todo });
  };
  const deleteTodo = (id: string) => {
    dispatch({ type: 'deleteTodo', payload: { id } });
  };
  return (
    <TodoContext.Provider
      value={{
        deleteTodo,
        todoState,
        addTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
