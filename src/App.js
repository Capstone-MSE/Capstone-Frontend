import {Route, Routes} from 'react-router-dom';
import Mainpage from './pages/Mainpage.js';

const App = () => {
  return(
    <Routes>
      <Route path="/" element={<Mainpage />} />
    </Routes>
  );
};

export default App;
