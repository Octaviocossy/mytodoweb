import { useContext } from 'react';

import TodoContext from '../context/todo/TodoContext';

const useTodo = () => {
  const {
    todoState,
    addTodo,
    deleteTodo,
    getATodoForEdit,
    toggleTodo,
    resetEdit,
    addTodoEdited,
    addTodoToLocalStorage,
    filter,
  } = useContext(TodoContext);

  return {
    addTodoToLocalStorage,
    getATodoForEdit,
    addTodoEdited,
    deleteTodo,
    toggleTodo,
    resetEdit,
    todoState,
    addTodo,
    filter,
  };
};

export default useTodo;
