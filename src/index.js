import ReactDOM from 'react-dom/client';
import React from 'react';
import './index.css';
import App from './App';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from './Pages/Auth';
import MainPage from './Pages/MainPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<App />} />
                <Route path="auth" element={<Auth />} />
                <Route path="login" element={<Login />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="project" element={<MainPage />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
