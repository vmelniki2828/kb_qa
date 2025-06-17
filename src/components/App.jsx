import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginForm from './login/LoginForm';
import Sidebar from './Sidebar';
import ReviewedChats from './reviewed-chats/ReviewedChats';
import MonthState from './month-state/MonthState';
import AnalisChat from './analis-chat/AnalisChat';

const mainBg = {
  minHeight: '100vh',
  background: '#12092A',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

function Home() {
  return (
    <>
      <Sidebar />
      <div style={mainBg}>
        <h1 style={{ color: '#fff', textAlign: 'center', fontSize: 40 }}>Главная страница</h1>
    </div>
    </>
  );
}

function RequireAuth({ children }) {
  const token = localStorage.getItem('tokens');
  const location = useLocation();
  
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  try {
    const tokens = JSON.parse(token);
    if (!tokens.access) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  } catch (err) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        } />
        <Route path="/reviewed_chats" element={
          <RequireAuth>
            <ReviewedChats />
          </RequireAuth>
        } />
        <Route path="/month_state" element={
          <RequireAuth>
            <MonthState />
          </RequireAuth>
        } />
        <Route path="/analis_chat" element={
          <RequireAuth>
            <AnalisChat />
          </RequireAuth>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
