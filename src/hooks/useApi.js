import { useNavigate } from 'react-router-dom';
import { getAuthHeaders, handleApiError } from '../utils/auth';

export const useApi = () => {
  const navigate = useNavigate();

  const apiRequest = async (url, options = {}) => {
    const headers = getAuthHeaders();
    if (!headers) {
      navigate('/login');
      throw new Error('Токен не найден');
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
      error.status = response.status;
      
      // Обрабатываем 401 ошибку
      if (handleApiError(error, navigate)) {
        throw error;
      }
      
      throw error;
    }

    return response;
  };

  return { apiRequest };
}; 