import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
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
        </Routes>
      </div>
    </Router>
  );
}


export default App;
