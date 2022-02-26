import { RiDeleteBin6Line, RiCheckLine, RiSubtractLine } from 'react-icons/ri';

import useTodo from '../../hooks/useTodo';
import Button from '../../ui/controls/Button';
import { Todo } from '../../types/todo';

interface Props {
  todo: Todo;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoItem: React.FC<Props> = ({ todo, setModal }) => {
  const { deleteTodo, toggleTodo, getATodoForEdit } = useTodo();
  const handleForm = () => {
    getATodoForEdit(todo);
    setModal((state) => !state);
  };

  return (
    <li
      className="flex bg-gray-100 mb-4 p-6 shadow-lg rounded-md items-center justify-center max-w-xs sm:max-w-none m-auto"
      onDoubleClick={handleForm}
    >
      <div className="flex-1 ml-4">
        <p
          className={`text-2xl font-semibold text-gray-700 ${
            todo.completed && 'line-through'
          }`}
        >
          {todo.title}
        </p>
        <p
          className={`text-lg mt-2 text-gray-600 ${
            todo.completed && 'line-through'
          }`}
        >
          {todo.desc}
        </p>
      </div>
      <Button
        action={() => toggleTodo(todo.id)}
        styles={`m-4 ml-4 text-3xl text-gray-700 ${
          todo.completed ? 'hover:text-red-400' : 'hover:text-green-400'
        }`}
        type="button"
        value={todo.completed ? <RiSubtractLine /> : <RiCheckLine />}
      />
      <Button
        action={() => deleteTodo(todo.id)}
        styles="mr-4 text-2xl text-gray-700 hover:text-red-400"
        type="button"
        value={<RiDeleteBin6Line />}
      />
    </li>
  );
};

export default TodoItem;
