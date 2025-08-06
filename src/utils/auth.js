// Утилита для работы с аутентификацией
export const checkTokenValidity = async () => {
  const tokens = localStorage.getItem('tokens');
  if (!tokens) {
    return false;
  }

  try {
    const { access } = JSON.parse(tokens);
    if (!access) {
      return false;
    }

    // Проверяем валидность токена на сервере
    const response = await fetch('https://cb-tools.qodeq.net/api/user/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${access}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      return true;
    } else {
      // Если получили 401, очищаем токены
      if (response.status === 401) {
        localStorage.removeItem('tokens');
        localStorage.removeItem('userData');
      }
      return false;
    }
  } catch (err) {
    console.error('Ошибка проверки токена:', err);
    return false;
  }
};

export const handleApiError = (error, navigate) => {
  if (error.status === 401) {
    // Очищаем токены при 401 ошибке
    localStorage.removeItem('tokens');
    localStorage.removeItem('userData');
    // Перенаправляем на страницу логина
    navigate('/login');
    return true; // Указываем, что ошибка обработана
  }
  return false; // Ошибка не обработана
};

export const getAuthHeaders = () => {
  const tokens = localStorage.getItem('tokens');
  if (!tokens) {
    return null;
  }

  try {
    const { access } = JSON.parse(tokens);
    return {
      'Authorization': `Bearer ${access}`,
      'Content-Type': 'application/json',
    };
  } catch (err) {
    return null;
  }
}; 