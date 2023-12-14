import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './pages/management/assets/vendor/fonts/boxicons.css';
import './pages/management/assets/vendor/css/core.css';
import './pages/management/assets/vendor/css/theme-default.css';
import './pages/management/assets/css/demo.css';
import './pages/management/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
