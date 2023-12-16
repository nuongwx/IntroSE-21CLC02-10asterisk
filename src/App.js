import {React, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Home from './pages/home';
import Login from './pages/login';
import Quiz from './pages/quiz'
import NavbarComponent from './pages/navbar';
import Register from './pages/register';
import ProtectedRoute from './ProtectedRoute.js'

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = (loggedInUsername) => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <>
      <NavbarComponent isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={
          <ProtectedRoute isAuthenticated={!isLoggedIn}>
            <Login isLoggedIn={isLoggedIn} onLogin={handleLogin}/>
          </ProtectedRoute>
        } />
        <Route path="/register" element={
          <ProtectedRoute isAuthenticated={!isLoggedIn}>
            <Register/>
          </ProtectedRoute>
        } />
        {/* Add other routes here */}
      </Routes>
    </>
  );
}

export default App;
