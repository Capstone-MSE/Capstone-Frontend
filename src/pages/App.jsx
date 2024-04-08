import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Signup from './Signup.js';
import Login from './Login.js';
import Categories from '../components/Categories.js';
import MainPage from './MainPage';
import LearnPage from './Learn';


const Home = () => (
  <div>
    <MainPage/>
  </div>
);

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;

