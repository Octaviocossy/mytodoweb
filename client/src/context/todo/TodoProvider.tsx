import { useReducer } from 'react';

import { Todo, TodoState } from '../types';

import TodoContext from './TodoContext';
import todoReducer from './todoReducer';

const INITIAL_STATE: TodoState = {
  todos: localStorage.getItem('todoList')
    ? JSON.parse(localStorage.getItem('todoList') || '')
    : [],
  completed: [],
  pending: [],
  edit: [],
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
  const getATodoForEdit = (todo: Todo) => {
    dispatch({ type: 'getTodo', payload: todo });
  };
  const toggleTodo = (id: string) => {
    dispatch({ type: 'toggleTodo', payload: { id } });
  };
  const filter = () => {
    dispatch({ type: 'filter' });
  };
  const resetEdit = () => {
    dispatch({ type: 'resetEdit' });
  };
  const addTodoEdited = (todo: Todo) => {
    dispatch({ type: 'addTodoEdited', payload: todo });
  };
  const addTodoToLocalStorage = () => {
    localStorage.setItem('todoList', JSON.stringify(todoState.todos));
  };

  return (
    <TodoContext.Provider
      value={{
        addTodoToLocalStorage,
        getATodoForEdit,
        addTodoEdited,
        deleteTodo,
        toggleTodo,
        resetEdit,
        todoState,
        addTodo,
        filter,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
