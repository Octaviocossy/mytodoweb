import { AuthState } from '../../types/auth';

import { Actions } from './actions';

const authReducer = (state: AuthState, action: Actions) => {
  switch (action.type) {
    case 'logSuccess':
    case 'regSuccess':
      localStorage.setItem('token', action.payload);

      return {
        ...state,
        token: localStorage.getItem('token'),
        authenticated: true,
        msg: null,
      };

    case 'logOut':
      localStorage.removeItem('token');

      return {
        ...state,
        user: null,
        token: null,
        authenticated: null,
      };

    case 'logFailed':
    case 'regFailed':
      localStorage.removeItem('token');

      return {
        ...state,
        user: null,
        token: null,
        authenticated: null,
        msg: action.payload,
      };

    case 'getUser':
      return {
        ...state,
        user: action.payload,
        authenticated: true,
      };

    default:
      return state;
  }
};

export default authReducer;
