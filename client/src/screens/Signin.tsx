import { FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useAuthAlert from '../hooks/useAuthAlert';
import { LogUser } from '../types/auth';
import useForm from '../hooks/useForm';
import useAuth from '../hooks/useAuth';
import Button from '../ui/controls/Button';
import Input from '../ui/form/Input';
import Label from '../ui/form/Label';
import Alert from '../components/auth/Alert';

const initialState: LogUser = {
  email: '',
  password: '',
};

const Signin = () => {
  const { data, handleChange } = useForm<LogUser>(initialState);
  const { authState, logUser, authUser } = useAuth();
  const { filtTypeOfError, msgemail, msgpassword, resetAlert } = useAuthAlert();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    resetAlert();
    logUser(data);
  };

  useEffect(() => {
    resetAlert();
  }, []);

  useEffect(() => {
    if (localStorage.getItem('token')) authUser();
  }, []);

  useEffect(() => {
    if (authState.authenticated) navigate('/todolist');
  }, [authState.authenticated]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <p className="text-5xl font-semibold text-gray-700">Sign In</p>
      <form className="flex flex-col mt-12" onSubmit={handleSubmit}>
        {msgemail && <Alert title={filtTypeOfError('email')} />}
        <Label styles="text-xl" value="Email" />
        <Input
          handleChange={handleChange}
          name={'email'}
          styles={'bg-gray-100 my-3'}
          type={'email'}
        />
        {msgpassword && <Alert title={filtTypeOfError('password')} />}
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
