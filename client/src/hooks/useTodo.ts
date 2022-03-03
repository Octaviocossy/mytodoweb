import { useContext } from 'react';

import TodoContext from '../context/todo/TodoContext';

const useTodo = () => {
  const {
    todoState,
    addTodo,
    deleteTodo,
    getATodoForEdit,
    resetEdit,
    addTodoEdited,
    getTodos,
    filter,
    deleteAllTodos,
  } = useContext(TodoContext);

  return {
    getATodoForEdit,
    deleteAllTodos,
    addTodoEdited,
    deleteTodo,
    resetEdit,
    todoState,
    getTodos,
    addTodo,
    filter,
  };
};

export default useTodo;
