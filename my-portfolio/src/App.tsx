import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Project from './pages/Project';
import VideoGame from './pages/VideoGame';
import AppBar from './components/AppBar';

function App() {
  return (
    <Router>
      <div className="bg-base-100 text-base-content min-h-screen"> {/* DaisyUI utility classes */}
        <AppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/video-game" element={<VideoGame />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;