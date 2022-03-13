import { useEffect, useState } from 'react';

import { Error } from '../types/auth';

import useAuth from './useAuth';

interface FieldErrorInt {
  password: boolean;
  name: boolean;
  default: boolean;
}

const useAuthAlert = () => {
  const [msgname, setMsgName] = useState<boolean>(false);
  const [msgdefault, setMsgDefault] = useState<boolean>(false);
  const [msgpassword, setMsgPassword] = useState<boolean>(false);
  const [alertcontent, setAlertContent] = useState<Error[]>([]);
  const { authState } = useAuth();
  const { msg } = authState;

  useEffect(() => {
    if (msg[0]) setAlertContent(msg);
  }, [msg]);

  useEffect(() => {
    alertcontent.map((err) => err.param === 'default' && setMsgDefault(true));
    alertcontent.map((err) => err.param === 'name' && setMsgName(true));
    alertcontent.map((err) => err.param === 'password' && setMsgPassword(true));
  }, [alertcontent]);

  const resetAlert = (): void => {
    setAlertContent([]);
    setMsgName(false);
    setMsgDefault(false);
    setMsgPassword(false);
  };

  const filtTypeOfError = (param: string): string => {
    let filt = alertcontent.filter((err) => err.param === param);

    return filt[0].msg;
  };

  const fieldError: FieldErrorInt = {
    password: false,
    default: false,
    name: false,
  };

  const resetfieldError = (): void => {
    fieldError['password'] = false;
    fieldError['default'] = false;
    fieldError['name'] = false;
  };

  return {
    setAlertContent,
    filtTypeOfError,
    resetfieldError,
    setMsgPassword,
    setMsgDefault,
    alertcontent,
    msgpassword,
    resetAlert,
    fieldError,
    msgdefault,
    msgname,
  };
};

export default useAuthAlert;
