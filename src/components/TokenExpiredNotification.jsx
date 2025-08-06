import React from 'react';
import { useNavigate } from 'react-router-dom';

const TokenExpiredNotification = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
    if (onClose) onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: '#fff3cd',
      border: '1px solid #ffeaa7',
      borderRadius: '8px',
      padding: '16px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 1000,
      maxWidth: '300px',
      animation: 'slideIn 0.3s ease-out'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px'
      }}>
        <div style={{
          color: '#856404',
          fontSize: '20px',
          flexShrink: 0
        }}>
          ⚠️
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontWeight: 'bold',
            color: '#856404',
            marginBottom: '8px',
            fontSize: '14px'
          }}>
            Сессия истекла
          </div>
          <div style={{
            color: '#856404',
            fontSize: '13px',
            marginBottom: '12px',
            lineHeight: '1.4'
          }}>
            Ваша сессия истекла. Пожалуйста, войдите в систему снова.
          </div>
          <div style={{
            display: 'flex',
            gap: '8px'
          }}>
            <button
              onClick={handleLogin}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '6px 12px',
                fontSize: '12px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Войти
            </button>
            {onClose && (
              <button
                onClick={onClose}
                style={{
                  backgroundColor: 'transparent',
                  color: '#856404',
                  border: '1px solid #856404',
                  borderRadius: '4px',
                  padding: '6px 12px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                Закрыть
              </button>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default TokenExpiredNotification; 