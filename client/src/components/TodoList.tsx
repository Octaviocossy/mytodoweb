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
          <TodoItem key={todo.id} todo={todo} setModal={setModal} />
        ))}
      {filterstate === 'completed' &&
        completed.map((todo) => (
          <TodoItem key={todo.id} todo={todo} setModal={setModal} />
        ))}
      {filterstate === 'pending' &&
        pending.map((todo) => (
          <TodoItem key={todo.id} todo={todo} setModal={setModal} />
        ))}
    </ul>
  );
};

export default TodoList;
