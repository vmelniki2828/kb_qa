import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginWrapper, Form, Title, Input, Button } from './LoginForm.styled';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const fetchUserData = async (accessToken) => {
    try {
      console.log('Используемый токен:', accessToken);
      
      const response = await fetch('https://cb-tools.qodeq.net/api/user/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log('Данные пользователя получены:', userData);
      } else {
        console.log('Ошибка получения пользователя:', response.status, await response.text());
      }
    } catch (err) {
      console.error('Ошибка получения данных пользователя:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    const credentials = { username, password };
    
    try {
      const response = await fetch('https://cb-tools.qodeq.net/api/token/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data.detail || 'Ошибка входа');
        return;
      }
      const data = await response.json();
      console.log('Ответ от сервера при логине:', data);
      setSuccess('Успешный вход!');
      localStorage.setItem('tokens', JSON.stringify(data));
      
      // Получаем данные пользователя используя access токен
      await fetchUserData(data.access);
      
      setTimeout(() => {
        navigate('/reviewed_chats');
      }, 500);
    } catch (err) {
      setError('Ошибка сети или CORS');
    }
  };

  return (
    <LoginWrapper>
      <Form onSubmit={handleSubmit}>
        <Title>Вход</Title>
        <Input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Войти</Button>
        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
        {success && <div style={{ color: 'lime', marginTop: 8 }}>{success}</div>}
      </Form>
    </LoginWrapper>
  );
};

export default LoginForm; 
