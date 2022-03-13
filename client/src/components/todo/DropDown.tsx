import { useEffect, useState } from 'react';
import { RiMenu5Line } from 'react-icons/ri';

import useAuth from '../../hooks/useAuth';
import useTodo from '../../hooks/useTodo';

interface Props {
  setFilterState: React.Dispatch<React.SetStateAction<string>>;
}

const DropDown: React.FC<Props> = ({ setFilterState }) => {
  const [togglelist, setToggleList] = useState<boolean>(false);
  const { deleteAllTodos, todoState } = useTodo();
  const { logOut } = useAuth();

  const handleClick = (text: string): void => {
    setFilterState(text);
    setToggleList((state) => !state);
  };

  const logOutFunct = () => {
    logOut();
    deleteAllTodos();
  };

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setToggleList(false);
    });
    document.getElementById('main')?.addEventListener('click', () => {
      setToggleList(false);
    });
  }, []);

  return (
    <>
      <button
        className="bg-gray-100 absolute top-3 right-3 cursor-pointer text-2xl p-1 rounded-md outline-none shadow-md text-gray-700 hover:text-yellow-500"
        type="button"
        onClick={() => setToggleList((state) => !state)}
      >
        <RiMenu5Line />
      </button>
      {togglelist && (
        <div className="absolute top-12 right-12 bg-gray-100 cursor-pointer text-lg rounded-md shadow-md text-gray-700 flex flex-col">
          <button
            className="border-b-2 p-2 hover:bg-gray-200 rounded-t-md outline-none"
            type="button"
            onClick={() => handleClick('all')}
          >
            All
          </button>
          <button
            className={`border-b-2 p-2 outline-none ${
              todoState.completed[0]
                ? 'hover:bg-gray-200'
                : 'text-gray-400 bg-gray-200'
            }`}
            disabled={todoState.completed[0] ? false : true}
            type="button"
            onClick={() => handleClick('completed')}
          >
            Completed
          </button>
          <button
            className={`border-b-2 p-2 outline-none ${
              todoState.pending[0]
                ? 'hover:bg-gray-200'
                : 'text-gray-400 bg-gray-200'
            }`}
            disabled={todoState.pending[0] ? false : true}
            type="button"
            onClick={() => handleClick('pending')}
          >
            Pending
          </button>
          <button
            className="border-b-2 p-2 hover:bg-gray-200 outline-none rounded-b-md text-red-500"
            type="button"
            onClick={logOutFunct}
          >
            Log Out
          </button>
        </div>
      )}
    </>
  );
};

export default DropDown;
