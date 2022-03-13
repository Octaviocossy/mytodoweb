import { useEffect, useState } from 'react';
import { RiAddFill } from 'react-icons/ri';

import DropDown from '../components/todo/DropDown';
import TodoList from '../components/todo/TodoList';
import useTodo from '../hooks/useTodo';
import useAuth from '../hooks/useAuth';
import Alert from '../components/Alert';
import Modal from '../ui/display/Modal';
import Form from '../components/todo/Form';

const TodoScreen = () => {
  const [filterstate, setFilterState] = useState<string>('all');
  const [spinnx, setSpinnX] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const { getTodos, todoState } = useTodo();
  const { authUser } = useAuth();

  useEffect(() => {
    (async () => {
      await authUser();
      getTodos();
      setSpinnX(true);
    })();
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setModal(false);
    });
  }, []);

  return (
    <>
      <DropDown setFilterState={setFilterState} />
      <div
        className="flex flex-col items-center justify-center min-h-screen"
        id={'main'}
      >
        {todoState.msg && <Alert title={todoState.msg} />}
        {todoState.todos[0] && (
          <TodoList filterstate={filterstate} setModal={setModal} />
        )}
        {filterstate === 'all' && (
          <button
            className="text-4xl text-gray-700 mt-4 mb-14 hover:text-yellow-500 outline-none"
            disabled={!spinnx && true}
            type="button"
            onClick={() => setModal((state) => !state)}
          >
            <RiAddFill
              className={`${!spinnx && 'animate-spin text-pink-500'}`}
            />
          </button>
        )}
      </div>
      {modal && <Modal component={<Form setModal={setModal} />} />}
    </>
  );
};

export default TodoScreen;
