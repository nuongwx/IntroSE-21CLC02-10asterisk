import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

import './styles/App.css';
import Home from './pages/home';
import Login from './pages/login';
import QuestList from './pages/management/quest-list.jsx';
import QuestEditor from './pages/management/quest-editor.jsx';

import NavbarComponent from './pages/navbar';
import useToken from './utils/auth.js';

function App() {
    const { token, setToken } = useToken();
    return (
        <QueryClientProvider client={new QueryClient()} >
            <div className="App">
                <Routes>
                    <Route path="/" element={<><NavbarComponent /><Home /></>} />
                    <Route path="/login" element={<><NavbarComponent /><Login setToken={setToken} /></>} />
                    <Route path="/management/" element={<QuestList />} />
                    <Route path="/management/:questId" element={<QuestEditor />} />
                    {/* Add other routes here */}
                </Routes>
            </div>
        </QueryClientProvider>
    );
}

export default App;
