import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginForm from './login/LoginForm';
import ReviewedChats from './reviewed-chats/ReviewedChats';
import MonthState from './month-state/MonthState';
import AnalisChat from './analis-chat/AnalisChat';
import AgentStats from './agent-stats/AgentStats';

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
            <Navigate to="/reviewed_chats" replace />
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
        <Route path="/agent_stats/:id" element={
          <RequireAuth>
            <AgentStats />
          </RequireAuth>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
