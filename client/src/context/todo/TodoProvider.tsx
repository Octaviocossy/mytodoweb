import { useReducer } from 'react';

import { DB_Todo, Todo, TodoState } from '../../types/todo';
import { ProviderProps } from '../../types/auth';
import useAuth from '../../hooks/useAuth';
import api from '../../api';

import todoReducer from './todoReducer';
import TodoContext from './TodoContext';

const initialState: TodoState = {
  completed: [],
  pending: [],
  todos: [],
  edit: [],
  msg: '',
};

const TodoProvider: React.FC<ProviderProps> = ({ children }) => {
  const [todoState, dispatch] = useReducer(todoReducer, initialState);
  const { logOut, authAlert } = useAuth();

  const getTodos = async () => {
    const res = await api.get('/api/todo');

    if (res.type === 'success') {
      dispatch({ type: 'getTodos', payload: res.value });

      return;
    }
    if (res.type === 'error') {
      dispatch({ type: 'errorMsg', payload: res.error.message });

      return;
    }

    authAlert(res.error);

    logOut();
  };

  const addTodo = async (todo: Todo) => {
    const res = await api.post('/api/todo', todo);

    if (res.type === 'success') {
      dispatch({ type: 'addTodo', payload: res.value });

      return;
    }
    if (res.type === 'error') {
      dispatch({ type: 'errorMsg', payload: res.error.message });

      return;
    }

    authAlert(res.error);

    logOut();
  };

  const deleteTodo = async (id: DB_Todo['_id']) => {
    const res = await api.delete('/api/todo/', id);

    if (res.type === 'success') {
      dispatch({ type: 'deleteTodo', payload: res.value });
      filter();

      return;
    }
    if (res.type === 'error') {
      dispatch({ type: 'errorMsg', payload: res.error.message });

      return;
    }

    authAlert(res.error);

    logOut();
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
    const res = await api.put('/api/todo/', todo);

    if (res.type === 'success') {
      dispatch({ type: 'addTodoEdited', payload: res.value });

      return;
    }

    if (res.type === 'error') {
      dispatch({ type: 'errorMsg', payload: res.error.message });

      return;
    }

    authAlert(res.error);

    logOut();
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
