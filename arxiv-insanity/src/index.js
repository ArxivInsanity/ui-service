import ReactDOM from 'react-dom/client';
import React from 'react';
import './index.css';
import App from './App';
import Login from './Pages/Login';
import Home from './Pages/Home';

import { BrowserRouter, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<App />} />
                <Route path="login" element={<Login />} />
                <Route path="home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
