import {React, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

import './styles/App.css';
import Home from './pages/home';
import Login from './pages/login';
import NavbarComponent from './pages/navbar';
import Register from './pages/register';
import ProtectedRoute from './ProtectedRoute.js'

import QuestList from './pages/management/quest-list.jsx';
import QuestEditor from './pages/management/quest-editor.jsx';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = (loggedInUsername) => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };
  return (
    <QueryClientProvider client={new QueryClient()} >
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
        <Route path="/management/" element={<QuestList/>} />
        <Route path="/management/:questId" element={<QuestEditor />} />
        {/* Add other routes here */}
      </Routes>
      </QueryClientProvider>
  );
}

export default App;
