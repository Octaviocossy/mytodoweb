import { FormEvent, useContext, useEffect, useState } from 'react';
import TodoContext from '../context/TodoContext';
import useForm from '../hooks/useForm';
import Button from '../ui/Button';
import Input from '../ui/Input';

type props = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type useFormProps = {
  id: string;
  title: string;
  desc: string;
  completed: boolean;
};

const Form = ({ setModal }: props) => {
  const { addTodo } = useContext(TodoContext);
  const [btnblocker, setBtnBlocker] = useState<boolean>(true);
  const { data, handleChange } = useForm<useFormProps>({
    id: Math.random().toString(36).slice(2),
    title: '',
    desc: '',
    completed: false,
  });
  useEffect(() => {
    [data.title, data.desc].includes('')
      ? setBtnBlocker(true)
      : setBtnBlocker(false);
  }, [data.title, data.desc]);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(data);
    setModal((state) => !state);
  };
  return (
    <form onSubmit={handleSubmit} className="p-6 flex flex-col">
      <Input
        type="text"
        styles="p-3 w-96 outline-none shadow-md rounded-md mb-3 text-gray-700"
        name="title"
        placeholder="Input a todo title"
        handleChange={handleChange}
      />
      <Input
        type="text"
        styles="p-3 w-96 outline-none shadow-md rounded-md mb-3 text-gray-700"
        name="desc"
        placeholder="Input a todo description"
        handleChange={handleChange}
      />
      <div className="flex mt-2">
        <Button
          type="button"
          value="Close"
          styles="bg-red-400 mr-4 w-full text-gray-100  shadow-md rounded-md p-3"
          action={() => setModal((state) => !state)}
        />
        <Button
          type="submit"
          value="Add"
          styles={` w-full text-gray-100 shadow-md rounded-md p-3 ${
            !btnblocker ? 'bg-green-400' : 'bg-gray-300'
          }`}
          disabled={btnblocker}
        />
      </div>
    </form>
  );
};

export default Form;
