import { useContext } from 'react';

import AuthContext from '../context/auth/AuthContext';

const useAuth = () => {
  const {
    authState,
    regUser,
    authUser,
    logUser,
    logOut,
    removeAllAlerts,
    authAlert,
  } = useContext(AuthContext);

  return {
    removeAllAlerts,
    authAlert,
    authState,
    authUser,
    regUser,
    logUser,
    logOut,
  };
};

export default useAuth;
