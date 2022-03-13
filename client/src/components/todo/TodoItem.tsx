import { RiDeleteBin6Line, RiCheckLine, RiSubtractLine } from 'react-icons/ri';

import useTodo from '../../hooks/useTodo';
import { DB_Todo } from '../../types/todo';

interface Props {
  todo: DB_Todo;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoItem: React.FC<Props> = ({ todo, setModal }) => {
  const { deleteTodo, getATodoForEdit, addTodoEdited } = useTodo();

  const handleForm = () => {
    getATodoForEdit(todo);
    setModal((state) => !state);
  };

  const switchState = (todo: DB_Todo) => {
    todo.completed = !todo.completed;
    addTodoEdited(todo);
  };

  return (
    <li
      className="flex bg-gray-100 mb-4 p-6 shadow-lg rounded-md items-center justify-center max-w-xs flex-col sm:flex-row sm:max-w-none m-auto"
      onDoubleClick={handleForm}
    >
      <div className="flex-1 sm:ml-4">
        <p
          className={`text-2xl font-semibold text-gray-700 cursor-default ${
            todo.completed && 'line-through'
          }`}
        >
          {todo.title}
        </p>
        <p
          className={`text-lg mt-2 text-gray-600 cursor-default ${
            todo.completed && 'line-through'
          }`}
        >
          {todo.desc}
        </p>
      </div>
      <div className="flex">
        <button
          className={`m-4 ml-4 text-3xl outline-none text-gray-700 ${
            todo.completed ? 'hover:text-red-400' : 'hover:text-green-400'
          } mb-0 sm:mb-4`}
          type="button"
          onClick={() => switchState(todo)}
        >
          {todo.completed ? <RiSubtractLine /> : <RiCheckLine />}
        </button>
        <button
          className="mr-4 text-2xl text-gray-700 outline-none hover:text-red-400 mt-4 sm:mt-0 "
          type="button"
          onClick={() => deleteTodo(todo._id)}
        >
          <RiDeleteBin6Line />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
