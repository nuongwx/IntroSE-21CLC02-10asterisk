import { React, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

import './styles/App.css';
import Home from './pages/home';
import Login from './pages/login';
import NavbarComponent from './pages/navbar';
import Register from './pages/register';
import Quest from './pages/quest';
import Explore from './pages/explore';
import Quiz from './pages/quiz'
import Checkout from './pages/checkout.jsx';
import ProtectedRoute from './ProtectedRoute.js'
import Profile from './pages/profile';
import QuestList from './pages/management/quest-list.jsx';
import QuestEditor from './pages/management/quest-editor.jsx';

import useToken from './utils/auth.js';

function App() {
  const navigate = useNavigate()
    const { token, setToken } = useToken();
    const [isLoggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        setLoggedIn(true);
    };

    const handleLogout = () => {
        setLoggedIn(false);
    };
    return (
        <QueryClientProvider client={new QueryClient()} >
            <div className="App bg-light text-dark">
                <Routes>
                    <Route path="/" element={<><NavbarComponent isLoggedIn={isLoggedIn} onLogout={handleLogout} /><Home /></>} />
                    <Route path="/login" element={
                        <>
                            <NavbarComponent isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                            <ProtectedRoute isAuthenticated={!isLoggedIn}>
                                <Login isLoggedIn={isLoggedIn} onLogin={handleLogin} setToken={setToken} />
                            </ProtectedRoute>
                        </>
                    } />
                    <Route path="/register" element={
                        <>
                            <NavbarComponent isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                            <ProtectedRoute isAuthenticated={!isLoggedIn}>
                                <Register />
                            </ProtectedRoute>
                        </>
                    } />
                    <Route path="/profile" element={
                        <>
                            <NavbarComponent isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                            <ProtectedRoute isAuthenticated={!isLoggedIn}>
                                <Profile />
                            </ProtectedRoute>
                        </>
                    } />
                    <Route path="/checkout/:questId" element={
                        <>
                            <NavbarComponent isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                            <Checkout />
                        </>
                    } />
                    <Route path="/explore" element={<><NavbarComponent isLoggedIn={isLoggedIn} onLogout={handleLogout} /><Explore /></>} />
                    <Route path="/quest/:questId" element={<><NavbarComponent isLoggedIn={isLoggedIn} onLogout={handleLogout} /><Quest /></>} />
                    <Route path="/quest/:questId/quiz" element={
                        <>
                          <NavbarComponent isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                          <ProtectedRoute isAuthenticated={!isLoggedIn}>
                            <Quiz />
                          </ProtectedRoute>
                        </>
                    } />
                    <Route path="/management/" element={<QuestList />} />
                    <Route path="/management/:questId" element={<QuestEditor />} />
                </Routes>
            </div>
        </QueryClientProvider>
    );
}

export default App;
