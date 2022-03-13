import { Route, Routes, BrowserRouter } from 'react-router-dom';

import AuthProvider from './context/auth/AuthProvider';
import TodoProvider from './context/todo/TodoProvider';
import PrivateRoute from './routes/PrivateRoute';
import TodoScreen from './screens/TodoScreen';
import Login from './screens/Login';
import Signup from './screens/Signup';

const App = () => {
  return (
    <AuthProvider>
      <TodoProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Login />} path="/" />
            <Route element={<Signup />} path="/signup" />
            <Route
              element={
                <PrivateRoute>
                  <TodoScreen />
                </PrivateRoute>
              }
              path="/todolist"
            />
          </Routes>
        </BrowserRouter>
      </TodoProvider>
    </AuthProvider>
  );
};

export default App;
