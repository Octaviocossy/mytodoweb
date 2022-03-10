import { useReducer } from 'react';

import api from '../../api';
import { AuthState, LogUser, ProviderProps, RegUser } from '../../types/auth';

import AuthContext from './AuthContext';
import authReducer from './authReducer';

const initialState: AuthState = {
  authenticated: null,
  loading: true,
  token: '',
  user: null,
  msg: [],
};

const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const authUser = async () => {
    const res = await api.auth('/api/auth');

    if (res.type === 'success') {
      dispatch({ type: 'getUser', payload: res.value });

      return;
    }

    dispatch({ type: 'logFailed', payload: res.error });
    logOut();
  };

  const regUser = async (user: RegUser) => {
    const res = await api.signInOrUp('/api/users', user);

    if (res.type === 'success') {
      dispatch({ type: 'regSuccess', payload: res.value });

      return;
    }

    dispatch({ type: 'regFailed', payload: res.error });
  };

  const logUser = async (user: LogUser) => {
    const res = await api.signInOrUp('/api/auth', user);

    if (res.type === 'success') {
      dispatch({ type: 'regSuccess', payload: res.value });

      return;
    }

    dispatch({ type: 'logFailed', payload: res.error });
  };

  const logOut = () => {
    dispatch({ type: 'logOut' });
  };

  const removeAllAlerts = () => {
    dispatch({ type: 'removeAllAlerts' });
  };

  return (
    <AuthContext.Provider
      value={{
        authState: state,
        removeAllAlerts,
        authUser,
        regUser,
        logUser,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
