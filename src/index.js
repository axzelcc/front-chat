import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import Chat from './components/chat/Chat';

const root = ReactDOM.createRoot(document.getElementById('root'));
const isAuthenticated = localStorage.getItem('authorization'); 
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/> 
        <Route path='/chat' element={isAuthenticated ? <Chat /> : <Navigate to="/login" />}/>     
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

