import './styles/App.css';

import Home from './pages/home.js';
import Quiz from './pages/quiz.js';

import { Routes, Route } from 'react-router-dom';

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

function App() {
    return (
        <>
            <h1>App</h1>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/quiz" element={<QueryClientProvider client={new QueryClient()}><Quiz questId="65715e636f04f51ffbde45d1" /></QueryClientProvider>} />
            </Routes>
        </>
    );
}

export default App;
