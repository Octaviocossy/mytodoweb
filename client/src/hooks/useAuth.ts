import { useContext } from 'react';

import AuthContext from '../context/auth/AuthContext';

const useAuth = () => {
  const { authState, regUser, authUser, logUser, logOut, removeAllAlerts } =
    useContext(AuthContext);

  return {
    removeAllAlerts,
    authState,
    authUser,
    regUser,
    logUser,
    logOut,
  };
};

export default useAuth;
