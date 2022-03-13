import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiLoader4Line } from 'react-icons/ri';

import useAuthAlert from '../hooks/useAlert';
import { RegUser } from '../types/auth';
import useForm from '../hooks/useForm';
import useAuth from '../hooks/useAuth';
import Button from '../ui/controls/Button';
import Input from '../ui/form/Input';
import Label from '../ui/form/Label';
import Alert from '../components/Alert';

const initialState: RegUser = {
  name: '',
  email: '',
  password: '',
};

const Signup = () => {
  const [data, handleChange] = useForm<RegUser>(initialState);
  const { regUser, authState, authUser, removeAllAlerts } = useAuth();
  const [spinn, setSpinn] = useState<boolean>(false);
  const {
    msgname,
    msgdefault,
    resetAlert,
    fieldError,
    msgpassword,
    setAlertContent,
    filtTypeOfError,
    resetfieldError,
    alertcontent,
  } = useAuthAlert();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSpinn(true);
    resetAlert();
    resetfieldError();

    if ([data.name].includes('')) {
      setAlertContent((alert) => [
        ...alert,
        {
          msg: 'The name is obligatory',
          param: 'name',
        },
      ]);
      fieldError['name'] = true;
    }

    if ([data.email].includes('')) {
      setAlertContent((alert) => [
        ...alert,
        {
          msg: 'Enter a valid email address.',
          param: 'default',
        },
      ]);
      fieldError['default'] = true;
    }

    if (data.password.length < 6) {
      setAlertContent((alert) => [
        ...alert,
        {
          msg: 'The password must have more than 6 characters',
          param: 'password',
        },
      ]);
      fieldError['password'] = true;
    }

    if (
      fieldError.password === true ||
      fieldError.default === true ||
      fieldError.name === true
    )
      return;

    resetfieldError();
    resetAlert();
    regUser(data);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) authUser();
  }, []);

  useEffect(() => {
    if (alertcontent[0]) {
      setSpinn(false);
    }
  }, [alertcontent]);

  useEffect(() => {
    if (authState.authenticated) navigate('/todolist');
  }, [authState.authenticated]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <p className="text-5xl font-semibold text-gray-700 ">Sign Up</p>
      <form className="flex flex-col mt-12" onSubmit={handleSubmit}>
        {msgname && <Alert title={filtTypeOfError('name')} type={'alert'} />}
        <Label styles="text-xl" value="Name" />
        <Input
          handleChange={handleChange}
          name={'name'}
          styles={'bg-gray-100 my-3'}
          type={'text'}
        />
        {msgdefault && (
          <Alert title={filtTypeOfError('default')} type={'alert'} />
        )}
        <Label styles="text-xl" value="Email" />
        <Input
          handleChange={handleChange}
          name={'email'}
          styles={'bg-gray-100 my-3'}
          type={'email'}
        />
        {msgpassword && (
          <Alert title={filtTypeOfError('password')} type={'alert'} />
        )}
        <Label styles="text-xl" value="Password" />
        <Input
          handleChange={handleChange}
          name={'password'}
          placeholder="6+ characteres"
          styles={'bg-gray-100 my-3'}
          type={'password'}
        />
        <button
          className="p-3 mt-5 outline-none shadow-md rounded-md mb-3 text-white bg-green-400"
          type="submit"
        >
          {spinn ? (
            <RiLoader4Line className="text-2xl m-auto animate-spin" />
          ) : (
            'Sign Up'
          )}
        </button>
      </form>
      <Link
        className="text-gray-500 mt-3 hover:underline"
        to="/"
        onClick={removeAllAlerts}
      >
        {'I have an account'}
      </Link>
    </div>
  );
};

export default Signup;
