import { useEffect } from 'react';

import useTodo from '../hooks/useTodo';

import TodoItem from './TodoItem';

type props = {
  filterstate: string;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const TodoList = ({ filterstate, setModal }: props) => {
  const { todoState, addTodoToLocalStorage, filter } = useTodo();
  const { todos, completed, pending } = todoState;

  useEffect(() => {
    addTodoToLocalStorage();
    filter();
  }, [todoState.todos]);

  return (
    <ul className="max-w-lg w-full">
      {filterstate === 'all' &&
        todos.map((todo) => (
          <TodoItem key={todo.id} setModal={setModal} todo={todo} />
        ))}
      {filterstate === 'completed' &&
        completed.map((todo) => (
          <TodoItem key={todo.id} setModal={setModal} todo={todo} />
        ))}
      {filterstate === 'pending' &&
        pending.map((todo) => (
          <TodoItem key={todo.id} setModal={setModal} todo={todo} />
        ))}
    </ul>
  );
};

export default TodoList;
