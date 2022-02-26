import { createContext } from 'react';

import { AuthState, LogUser, RegUser } from '../../types/auth';

interface Props {
  authState: AuthState;
  logOut: () => void;
  authUser: () => void;
  regUser: (data: RegUser) => void;
  logUser: (data: LogUser) => void;
}

const AuthContext = createContext<Props>({} as Props);

export default AuthContext;
