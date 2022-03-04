import { useEffect, useState } from 'react';
import { RiAddFill } from 'react-icons/ri';

import DropDown from '../components/todo/DropDown';
import TodoList from '../components/todo/TodoList';
import useTodo from '../hooks/useTodo';
import useAuth from '../hooks/useAuth';
import Button from '../ui/controls/Button';
import Alert from '../components/auth/Alert';
import Modal from '../ui/display/Modal';
import Form from '../components/todo/Form';

const TodoScreen = () => {
  const [filterstate, setFilterState] = useState<string>('all');
  const [modal, setModal] = useState<boolean>(false);
  const { getTodos, todoState } = useTodo();
  const { authUser } = useAuth();

  useEffect(() => {
    authUser();
    getTodos();
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
        {todoState.msg && (
          <Alert
            styles={'mb-6 mx-auto bg-yellow-200 border-yellow-400'}
            textStyles={'text-yellow-800'}
            title={todoState.msg}
          />
        )}
        <TodoList filterstate={filterstate} setModal={setModal} />
        <Button
          action={() => setModal((state) => !state)}
          styles="text-4xl text-gray-700 mt-4 hover:text-yellow-500"
          type="button"
          value={<RiAddFill />}
        />
      </div>
      {modal && <Modal component={<Form setModal={setModal} />} />}
    </>
  );
};

export default TodoScreen;
