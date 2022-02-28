import { AuthState } from '../../types/auth';

import { Actions } from './actions';

const authReducer = (state: AuthState, action: Actions) => {
  switch (action.type) {
    case 'logSuccess':
    case 'regSuccess':
      localStorage.setItem('token', action.payload);

      return {
        ...state,
        msg: [],
        loading: true,
        authenticated: true,
        token: localStorage.getItem('token'),
      };

    case 'logOut':
      localStorage.removeItem('token');

      return {
        ...state,
        user: null,
        token: null,
        loading: false,
        authenticated: null,
      };

    case 'logFailed':
    case 'regFailed':
      localStorage.removeItem('token');

      return {
        ...state,
        user: null,
        token: null,
        loading: false,
        msg: action.payload,
        authenticated: null,
      };

    case 'getUser':
      return {
        ...state,
        loading: true,
        authenticated: true,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
