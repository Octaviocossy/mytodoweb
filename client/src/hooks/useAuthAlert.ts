import { useEffect, useState } from 'react';

import { Error } from '../types/auth';

import useAuth from './useAuth';

const useAuthAlert = () => {
  const [msgname, setMsgName] = useState<boolean>(false);
  const [msgemail, setMsgEmail] = useState<boolean>(false);
  const [msgpassword, setMsgPassword] = useState<boolean>(false);
  const [alertcontent, setAlertContent] = useState<Error[]>([]);
  const { authState } = useAuth();
  const { msg } = authState;

  useEffect(() => {
    if (msg[0]) setAlertContent(msg);
  }, [msg]);

  useEffect(() => {
    alertcontent.map((err) => err.param === 'email' && setMsgEmail(true));
    alertcontent.map((err) => err.param === 'name' && setMsgName(true));
    alertcontent.map((err) => err.param === 'password' && setMsgPassword(true));
  }, [alertcontent]);

  const resetAlert = () => {
    setAlertContent([]);
    setMsgName(false);
    setMsgEmail(false);
    setMsgPassword(false);
  };

  const filtTypeOfError = (param: string): string => {
    let filt = alertcontent.filter((err) => err.param === param);

    return filt[0].msg;
  };

  return {
    filtTypeOfError,
    setAlertContent,
    alertcontent,
    msgpassword,
    resetAlert,
    msgemail,
    msgname,
  };
};

export default useAuthAlert;
