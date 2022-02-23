import { useState } from 'react';
import { RiAddFill } from 'react-icons/ri';

import DropDown from '../components/todo/DropDown';
import Form from '../components/todo/Form';
import TodoList from '../components/todo/TodoList';
import TodoProvider from '../context/todo/TodoProvider';
import Button from '../ui/controls/Button';
import Modal from '../ui/display/Modal';

const TodoScreen = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [filterstate, setFilterState] = useState<string>('all');

  return (
    <TodoProvider>
      <>
        <DropDown setFilterState={setFilterState} />
        <div className="flex flex-col items-center justify-center min-h-screen">
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
    </TodoProvider>
  );
};

export default TodoScreen;
