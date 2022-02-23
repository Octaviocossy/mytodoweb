import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Home from './screens/Home';
import Signin from './screens/Signin';
import Signup from './screens/Signup';
import TodoScreen from './screens/TodoScreen';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Signin />} path="/signin" />
        <Route element={<Signup />} path="/signup" />
        <Route element={<TodoScreen />} path="/todolist" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
