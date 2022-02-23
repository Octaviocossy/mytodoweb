import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../ui/controls/Button';
import useForm from '../hooks/useForm';
import Input from '../ui/form/Input';
import Label from '../ui/form/Label';
import Alert from '../components/auth/Alert';

interface UserProps {
  email: string;
  password: string;
}

const initialState: UserProps = {
  email: '',
  password: '',
};

const Signin = () => {
  const [alert, setAlert] = useState<boolean>(false);
  const { data, handleChange } = useForm<UserProps>(initialState);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if ([data.password, data.email].includes('')) {
      return setAlert(true);
    }
    setAlert(false);
    console.log(data);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <p className="text-5xl font-semibold text-gray-700">Sign In</p>
      <form className="flex flex-col mt-12" onSubmit={handleSubmit}>
        {alert && <Alert title="Complete all Fields" />}
        <Label styles="text-xl" value="Email" />
        <Input
          handleChange={handleChange}
          name={'email'}
          styles={'bg-gray-100 my-3'}
          type={'email'}
        />
        <Label styles="text-xl" value="Password" />
        <Input
          handleChange={handleChange}
          name={'password'}
          styles={'bg-gray-100 my-3'}
          type={'password'}
        />
        <Button
          styles="p-3 mt-5 outline-none shadow-md rounded-md mb-3 text-white bg-green-400"
          type="submit"
          value="Submit"
        />
      </form>
      <Link className="text-gray-500 mt-3 hover:underline" to="/signup">
        {'I do not have an account'}
      </Link>
    </div>
  );
};

export default Signin;
