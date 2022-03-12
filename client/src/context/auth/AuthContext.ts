import { createContext } from 'react';

import { AuthState, Error, LogUser, RegUser } from '../../types/auth';

interface Props {
  authState: AuthState;
  logOut: () => void;
  regUser: (data: RegUser) => void;
  logUser: (data: LogUser) => void;
  authUser: () => void;
  authAlert: (alert: Error[]) => void;
  removeAllAlerts: () => void;
}

const AuthContext = createContext<Props>({} as Props);

export default AuthContext;
