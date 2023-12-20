import { React, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
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
            <div className="App bg-light">
                <Routes>
                    <Route path="/" element={<><NavbarComponent isLoggedIn={isLoggedIn} onLogout={handleLogout} /><Home /></>} />
                    <Route path="/login" element={
                        <>
                            <NavbarComponent />
                            <ProtectedRoute isAuthenticated={!isLoggedIn}>
                                <Login isLoggedIn={isLoggedIn} onLogin={handleLogin} setToken={setToken} />
                            </ProtectedRoute>
                        </>
                    } />
                    <Route path="/register" element={
                        <>
                            <NavbarComponent />
                            <ProtectedRoute isAuthenticated={!isLoggedIn}>
                                <Register />
                            </ProtectedRoute>
                        </>
                    } />
                    <Route path="/profile" element={
                        <>
                            <NavbarComponent />
                            <ProtectedRoute isAuthenticated={!isLoggedIn}>
                                <Profile />
                            </ProtectedRoute>
                        </>
                    } />
                    <Route path="/checkout/:questId" element={
                        <>
                            <NavbarComponent />
                            <Checkout />
                        </>
                    } />
                    <Route path="/explore" element={<><NavbarComponent /><Explore /></>} />
                    <Route path="/quest/:questId" element={<><NavbarComponent /><Quest /></>} />
                    <Route path="/quest/:questId/quiz" element={<><NavbarComponent /><Quiz /></>} />
                    <Route path="/management/" element={<QuestList />} />
                    <Route path="/management/:questId" element={<QuestEditor />} />

                </Routes>
            </div>
        </QueryClientProvider>
    );
}

export default App;
