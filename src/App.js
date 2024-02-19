import {Route, Routes} from 'react-router-dom';
import Mainpage from './pages/Mainpage.js';
import Signup from './pages/Signup.js';
import Login from './pages/Login.js';
import Categories from './components/Categories.js';

const App = () => {
  return(
    <Routes>
      <Route element={<Categories />}>
        <Route path="/" element={<Mainpage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default App;
