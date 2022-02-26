import { useReducer } from 'react';

import { ProviderProps } from '../../types/auth';
import { Todo, TodoState } from '../../types/todo';

import TodoContext from './TodoContext';
import todoReducer from './todoReducer';

const initialState: TodoState = {
  todos: localStorage.getItem('todoList')
    ? JSON.parse(localStorage.getItem('todoList') || '')
    : [],
  completed: [],
  pending: [],
  edit: [],
};

const TodoProvider: React.FC<ProviderProps> = ({ children }) => {
  const [todoState, dispatch] = useReducer(todoReducer, initialState);
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
