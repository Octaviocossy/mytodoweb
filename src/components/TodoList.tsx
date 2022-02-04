import { useContext } from 'react';
import TodoContext from '../context/TodoContext';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { todoState } = useContext(TodoContext);
  const { todos } = todoState;
  return (
    <ul className="max-w-lg w-full">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
