import { FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useAuthAlert from '../hooks/useAuthAlert';
import { RegUser } from '../types/auth';
import useForm from '../hooks/useForm';
import useAuth from '../hooks/useAuth';
import Button from '../ui/controls/Button';
import Input from '../ui/form/Input';
import Label from '../ui/form/Label';
import Alert from '../components/auth/Alert';

const initialState: RegUser = {
  name: '',
  email: '',
  password: '',
};

const Signup = () => {
  const { data, handleChange } = useForm<RegUser>(initialState);
  const { regUser, authState, authUser } = useAuth();
  const { filtTypeOfError, msgname, msgemail, msgpassword, resetAlert } =
    useAuthAlert();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetAlert();
    regUser(data);
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
      <p className="text-5xl font-semibold text-gray-700 ">Sign Up</p>
      <form className="flex flex-col mt-12" onSubmit={handleSubmit}>
        {msgname && <Alert title={filtTypeOfError('name')} />}
        <Label styles="text-xl" value="Name" />
        <Input
          handleChange={handleChange}
          name={'name'}
          styles={'bg-gray-100 my-3'}
          type={'text'}
        />
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
          placeholder="6+ characteres"
          styles={'bg-gray-100 my-3'}
          type={'password'}
        />
        <Button
          styles="p-3 mt-5 outline-none shadow-md rounded-md mb-3 text-white bg-green-400 text-lg"
          type="submit"
          value="Submit"
        />
      </form>
      <Link
        className="text-gray-500 mt-3 hover:underline"
        to="/"
        onClick={resetAlert}
      >
        {'I have an account'}
      </Link>
    </div>
  );
};

export default Signup;
