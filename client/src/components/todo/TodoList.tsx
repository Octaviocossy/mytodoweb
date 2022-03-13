import { useEffect } from 'react';

import useTodo from '../../hooks/useTodo';

import TodoItem from './TodoItem';

interface Props {
  filterstate: string;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoList: React.FC<Props> = ({ filterstate, setModal }) => {
  const { todoState, filter } = useTodo();
  const { todos, completed, pending } = todoState;

  useEffect(() => {
    filter();
  }, [todos]);

  return (
    <ul className={`max-w-lg w-full mt-14 ${filterstate !== 'all' && 'mb-14'}`}>
      {filterstate === 'all' &&
        todos.map((todo) => (
          <TodoItem key={todo._id} setModal={setModal} todo={todo} />
        ))}
      {filterstate === 'completed' &&
        completed.map((todo) => (
          <TodoItem key={todo._id} setModal={setModal} todo={todo} />
        ))}
      {filterstate === 'pending' &&
        pending.map((todo) => (
          <TodoItem key={todo._id} setModal={setModal} todo={todo} />
        ))}
    </ul>
  );
};

export default TodoList;
