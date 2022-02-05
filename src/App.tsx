import { useState } from 'react';
import DropDown from './components/DropDown';
import Form from './components/Form';
import TodoList from './components/TodoList';
import TodoProvider from './context/TodoProvider';
import Button from './ui/Button';
import Modal from './ui/Modal';
import { RiAddFill } from 'react-icons/ri';

const App = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [filterstate, setFilterState] = useState<string>('all');
  return (
    <TodoProvider>
      <>
        <DropDown setFilterState={setFilterState} />
        <div className="flex flex-col items-center justify-center min-h-screen">
          <TodoList filterstate={filterstate} setModal={setModal} />
          <Button
            value={<RiAddFill />}
            type="button"
            styles="text-4xl text-gray-700 mt-4 hover:text-yellow-500"
            action={() => setModal((state) => !state)}
          />
        </div>
        {modal && <Modal component={<Form setModal={setModal} />} />}
      </>
    </TodoProvider>
  );
};

export default App;
