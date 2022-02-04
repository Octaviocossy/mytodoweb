import { useContext } from 'react';
import { RiDeleteBin6Line, RiCheckLine, RiSubtractLine } from 'react-icons/ri';
import TodoContext from '../context/TodoContext';
import { Todo } from '../types';
import Button from '../ui/Button';

type props = {
  todo: Todo;
};

const TodoItem = ({ todo }: props) => {
  const { deleteTodo } = useContext(TodoContext);
  return (
    <li className="flex bg-gray-100 mb-4 p-6 shadow-lg rounded-md items-center justify-center">
      <div className="flex-1 ml-4">
        <p className="text-2xl font-semibold text-gray-700">{todo.title}</p>
        <p className="text-lg mt-2 text-gray-600">{todo.desc}</p>
      </div>
      <Button
        value={todo.completed ? <RiSubtractLine /> : <RiCheckLine />}
        type="button"
        styles={`m-4 ml-4 text-3xl text-gray-700 ${
          todo.completed ? 'hover:text-red-400' : 'hover:text-green-400'
        }`}
      />
      <Button
        value={<RiDeleteBin6Line />}
        type="button"
        styles="mr-4 text-2xl text-gray-700 hover:text-red-400"
        action={() => deleteTodo(todo.id)}
      />
    </li>
  );
};

export default TodoItem;
