import { useReducer } from 'react';

import client from '../../config/axios';
import { ProviderProps } from '../../types/auth';
import { DB_Todo, Todo, TodoState } from '../../types/todo';

import TodoContext from './TodoContext';
import todoReducer from './todoReducer';

const initialState: TodoState = {
  completed: [],
  pending: [],
  todos: [],
  edit: [],
  msg: '',
};

const TodoProvider: React.FC<ProviderProps> = ({ children }) => {
  const [todoState, dispatch] = useReducer(todoReducer, initialState);

  const getTodos = async () => {
    try {
      const res = await client.get('/api/todo');

      dispatch({ type: 'getTodos', payload: res.data.todos });
    } catch (err: any) {
      dispatch({ type: 'errorTodo', payload: err.response.data.msg });
    }
  };

  const addTodo = async (todo: Todo) => {
    try {
      const res = await client.post('/api/todo', todo);

      dispatch({ type: 'addTodo', payload: res.data });
    } catch (err: any) {
      dispatch({ type: 'errorTodo', payload: err.response.data.msg });
    }
  };

  const deleteTodo = async (id: DB_Todo['_id']) => {
    try {
      await client.delete(`/api/todo/${id}`);
      dispatch({ type: 'deleteTodo', payload: { id } });
    } catch (err: any) {
      dispatch({ type: 'errorTodo', payload: err.response.data.msg });
    }
  };

  const getATodoForEdit = (todo: DB_Todo) => {
    dispatch({ type: 'getTodo', payload: todo });
  };

  const filter = () => {
    dispatch({ type: 'filter' });
  };

  const resetEdit = () => {
    dispatch({ type: 'resetEdit' });
  };

  const addTodoEdited = async (todo: DB_Todo) => {
    try {
      await client.put(`/api/todo/${todo._id}`, todo);
      dispatch({ type: 'addTodoEdited', payload: todo });
    } catch (err: any) {
      dispatch({ type: 'errorTodo', payload: err.response.data.msg });
    }
  };

  const deleteAllTodos = () => {
    dispatch({ type: 'deleteAllTodos' });
  };

  return (
    <TodoContext.Provider
      value={{
        getATodoForEdit,
        deleteAllTodos,
        addTodoEdited,
        deleteTodo,
        resetEdit,
        todoState,
        getTodos,
        addTodo,
        filter,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
