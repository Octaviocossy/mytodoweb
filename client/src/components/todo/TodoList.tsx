import { useEffect } from 'react';

import useTodo from '../../hooks/useTodo';

import TodoItem from './TodoItem';

interface Props {
  filterstate: string;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoList: React.FC<Props> = ({ filterstate, setModal }) => {
  const { todoState, addTodoToLocalStorage, filter } = useTodo();
  const { todos, completed, pending } = todoState;

  useEffect(() => {
    addTodoToLocalStorage();
    filter();
  }, [todos]);

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
