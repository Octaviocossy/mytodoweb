import { useReducer } from 'react';

import client from '../../config/axios';
import authToken from '../../config/token';
import { AuthState, LogUser, ProviderProps, RegUser } from '../../types/auth';

import AuthContext from './AuthContext';
import authReducer from './authReducer';

const initialState: AuthState = {
  authenticated: null,
  user: null,
  token: '',
  msg: [],
};

const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const authUser = async () => {
    const token = localStorage.getItem('token');

    if (token) authToken(token);

    try {
      const res = await client.get('/api/auth');

      dispatch({ type: 'getUser', payload: res.data.user });
    } catch (err: any) {
      dispatch({ type: 'logFailed', payload: err.response.data.errors });
    }
  };

  const regUser = async (user: RegUser) => {
    try {
      const res = await client.post('/api/users', user);

      dispatch({ type: 'regSuccess', payload: res.data.token });
      authUser();
    } catch (err: any) {
      dispatch({ type: 'regFailed', payload: err.response.data.errors });
    }
  };

  const logUser = async (user: LogUser) => {
    try {
      const res = await client.post('/api/auth', user);

      dispatch({ type: 'logSuccess', payload: res.data.token });
      authUser();
    } catch (err: any) {
      dispatch({ type: 'regFailed', payload: err.response.data.errors });
    }
  };

  const logOut = () => {
    dispatch({ type: 'logOut' });
  };

  return (
    <AuthContext.Provider
      value={{
        authState: state,
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
