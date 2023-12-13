import './styles/App.css';

import Home from './pages/home.js';
import Quiz from './pages/quiz.js';
import Login from './pages/login.js'
import NavbarComponent from './pages/navbar.js'

import { Routes, Route } from 'react-router-dom';

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

function App() {
    let component
    switch (window.location.pathname){
        case "/":
            component = <Home />;
            break;
        case "/login":
            component = <Login />;
            break;
        default:
            component = <Home />
    }
    return (
        <>
            <NavbarComponent />
            {component}
        </>
    );
}

export default App;
