import { FormEvent, useEffect, useState } from 'react';

import { DB_Todo, Todo } from '../../types/todo';
import useForm from '../../hooks/useForm';
import useTodo from '../../hooks/useTodo';
import Input from '../../ui/form/Input';

interface Props {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Form: React.FC<Props> = ({ setModal }) => {
  const { addTodo, todoState, resetEdit, addTodoEdited } = useTodo();
  const { edit } = todoState;
  const [btnblocker, setBtnBlocker] = useState<boolean>(true);

  const [createTodo, handleChangeCreate] = useForm<Todo>({
    desc: '',
    title: '',
    completed: false,
  });

  const [editTodo, handleChangeEdit] = useForm<DB_Todo>(
    edit[0]
      ? edit[0]
      : {
          _id: '',
          desc: '',
          title: '',
          creator: '',
          completed: false,
        }
  );

  useEffect(() => {
    if (edit[0]) {
      [editTodo.title].includes('')
        ? setBtnBlocker(true)
        : setBtnBlocker(false);
    } else {
      [createTodo.title].includes('')
        ? setBtnBlocker(true)
        : setBtnBlocker(false);
    }
  }, [createTodo.title, editTodo.title]);

  const closeModal = () => {
    setModal((state) => !state);
    resetEdit();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (edit[0]) {
      addTodoEdited(editTodo);
    } else {
      addTodo(createTodo);
    }
    closeModal();
  };

  return (
    <form className="py-6 flex flex-col sm:p-6" onSubmit={handleSubmit}>
      <Input
        handleChange={edit[0] ? handleChangeEdit : handleChangeCreate}
        name="title"
        placeholder="Input a todo title"
        styles="mx-5 sm:mx-0"
        type="text"
        value={edit[0] ? editTodo.title : createTodo.title}
      />
      <Input
        handleChange={edit[0] ? handleChangeEdit : handleChangeCreate}
        name="desc"
        placeholder="Input a todo description"
        styles="mx-5 sm:mx-0"
        type="text"
        value={edit[0] ? editTodo.desc : createTodo.desc}
      />
      <div className="flex mt-2 flex-col sm:flex-row">
        <button
          className="bg-red-400 text-gray-100 shadow-md rounded-md p-3 max-w-xs outline-none w-80 m-auto mb-2 sm:w-full sm:mr-3 sm:mb-0"
          type="button"
          value="Close"
          onClick={closeModal}
        >
          Close
        </button>
        <button
          className={`text-gray-100 shadow-md rounded-md p-3 w-80 m-auto max-w-xs outline-none sm:w-full ${
            !btnblocker ? 'bg-green-400' : 'bg-gray-300'
          }`}
          disabled={btnblocker}
          type="submit"
          value="Add"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default Form;
