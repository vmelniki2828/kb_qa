import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import LoginForm from './login/LoginForm';
import ReviewedChats from './reviewed-chats/ReviewedChats';
import MonthState from './month-state/MonthState';
import AnalisChat from './analis-chat/AnalisChat';
import AgentStats from './agent-stats/AgentStats';
import { checkTokenValidity } from '../utils/auth';

function RequireAuth({ children }) {
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('tokens');
      
      if (!token) {
        setIsValidating(false);
        setIsValid(false);
        return;
      }

      try {
        const tokens = JSON.parse(token);
        if (!tokens.access) {
          setIsValidating(false);
          setIsValid(false);
          return;
        }

        // Проверяем валидность токена на сервере
        const isValidToken = await checkTokenValidity();
        setIsValid(isValidToken);
      } catch (err) {
        console.error('Ошибка валидации токена:', err);
        setIsValid(false);
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, []);

  // Показываем загрузку во время проверки токена
  if (isValidating) {
    return <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontSize: '18px'
    }}>
      Проверка авторизации...
    </div>;
  }

  // Если токен невалиден, перенаправляем на логин
  if (!isValid) {
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
