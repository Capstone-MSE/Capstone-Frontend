import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import MainPage from './MainPage';
import LearnPage from './Learn';
import Chat  from './Chat.jsx'
import Export from '../components/UploadLearnfileButton.jsx'
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
          <Route path="/chatbot" element={<Chat />} />
          <Route path="/export" element={<Export />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;

