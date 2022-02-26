import { Navigate, useLocation } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

interface Props {
  children: JSX.Element;
}

const PrivateRoute: React.FC<Props> = (props) => {
  let location = useLocation();
  const { authState } = useAuth();

  if (!authState.authenticated) {
    return <Navigate state={{ from: location }} to="/" />;
  }

  return props.children;
};

export default PrivateRoute;
