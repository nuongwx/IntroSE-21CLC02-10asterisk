import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Home from './pages/home';
import Login from './pages/login';
import NavbarComponent from './pages/navbar';

function App() {
  return (
    <div>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* Add other routes here */}
      </Routes>
    </div>
  );
}

export default App;
