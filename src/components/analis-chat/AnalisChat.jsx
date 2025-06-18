import React, { useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Sidebar from '../Sidebar';

const animationStyles = `
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .result-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(108, 71, 255, 0.25), inset 0 1px 0 rgba(255,255,255,0.15) !important;
  }
  
  .section-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #6C47FF, #9D50FF);
    border-radius: 2px;
  }

  /* Красивый скролл для чата */
  .chat-scroll::-webkit-scrollbar {
    width: 8px;
  }
  
  .chat-scroll::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    margin: 4px;
  }
  
  .chat-scroll::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #6C47FF 0%, #9D50FF 100%);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
  }
  
  .chat-scroll::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #7C57FF 0%, #AD60FF 100%);
    box-shadow: 0 0 10px rgba(108, 71, 255, 0.5);
  }
  
  .chat-scroll::-webkit-scrollbar-thumb:active {
    background: linear-gradient(135deg, #5C37FF 0%, #8D40FF 100%);
  }
  
  /* Для Firefox */
  .chat-scroll {
    scrollbar-width: thin;
    scrollbar-color: #6C47FF rgba(255, 255, 255, 0.05);
  }
`;

const mainBg = {
  height: '100vh',
  background: '#12092A',
  display: 'flex',
  overflow: 'hidden',
};

const contentStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 20px',
  gap: '30px',
};

const buttonStyle = {
  background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
  border: 'none',
  borderRadius: '12px',
  color: '#fff',
  padding: '15px 30px',
  fontSize: '18px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
  minWidth: '200px',
};

const dateContainerStyle = {
  display: 'flex',
  gap: '30px',
  alignItems: 'center',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

const dateFieldStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
};

const labelStyle = {
  color: '#fff',
  fontSize: '16px',
  fontWeight: '500',
};

const inputStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '2px solid rgba(108, 71, 255, 0.3)',
  borderRadius: '8px',
  color: '#fff',
  padding: '12px 16px',
  fontSize: '16px',
  outline: 'none',
  transition: 'border-color 0.2s ease',
  minWidth: '160px',
};

const chatContainerStyle = {
  display: 'flex',
  width: '95%',
  maxWidth: '1600px',
  height: 'calc(100vh - 100px)',
  gap: '20px',
  padding: '20px',
  margin: '0 auto',
};

const messagesContainerStyle = {
  flex: 1.5,
  background: 'linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
  borderRadius: '12px',
  padding: '16px',
  overflowY: 'auto',
  border: '1px solid rgba(108, 71, 255, 0.3)',
  boxShadow: '0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
  display: 'flex',
  flexDirection: 'column',
  backdropFilter: 'blur(10px)',
};

const resultsContainerStyle = {
  flex: 1,
  background: 'linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
  borderRadius: '12px',
  padding: '16px',
  overflowY: 'auto',
  border: '1px solid rgba(108, 71, 255, 0.3)',
  boxShadow: '0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
  backdropFilter: 'blur(10px)',
};

const messageStyle = {
  padding: '10px 14px',
  borderRadius: '8px',
  width: '70%',
  wordWrap: 'break-word',
};

const customerMessageStyle = {
  ...messageStyle,
  background: 'linear-gradient(135deg, rgba(108, 71, 255, 0.15), rgba(108, 71, 255, 0.05))',
  border: '1px solid rgba(108, 71, 255, 0.3)',
  borderRadius: '18px 18px 18px 4px',
  alignSelf: 'flex-start',
  marginRight: 'auto',
  boxShadow: '0 4px 16px rgba(108, 71, 255, 0.2)',
  position: 'relative',
  animation: 'slideInLeft 0.3s ease-out',
};

const managerMessageStyle = {
  ...messageStyle,
  background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.15), rgba(76, 175, 80, 0.05))',
  border: '1px solid rgba(76, 175, 80, 0.3)',
  borderRadius: '18px 18px 4px 18px',
  alignSelf: 'flex-end',
  marginLeft: 'auto',
  boxShadow: '0 4px 16px rgba(76, 175, 80, 0.2)',
  position: 'relative',
  animation: 'slideInRight 0.3s ease-out',
};

const systemMessageStyle = {
  ...messageStyle,
  background: 'rgba(128, 128, 128, 0.1)',
  border: '1px solid rgba(128, 128, 128, 0.2)',
  borderRadius: '12px',
  alignSelf: 'center',
  margin: '8px auto',
  width: '75%',
  textAlign: 'center',
  color: 'rgba(255, 255, 255, 0.6)',
  fontSize: '13px',
  fontStyle: 'italic',
  boxShadow: '0 2px 8px rgba(128, 128, 128, 0.1)',
};

const messageHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '10px',
  fontSize: '11px',
  color: 'rgba(255,255,255,0.7)',
  fontWeight: '500',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const messageContentStyle = {
  color: '#fff',
  fontSize: '15px',
  lineHeight: '1.5',
  fontWeight: '400',
  letterSpacing: '0.2px',
};

const resultItemStyle = {
  marginBottom: '16px',
  padding: '14px',
  borderRadius: '12px',
  background: 'linear-gradient(135deg, rgba(108, 71, 255, 0.12), rgba(108, 71, 255, 0.04))',
  border: '1px solid rgba(108, 71, 255, 0.25)',
  boxShadow: '0 4px 16px rgba(108, 71, 255, 0.12), inset 0 1px 0 rgba(255,255,255,0.1)',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
};

const sectionTitleStyle = {
  color: '#6C47FF',
  fontSize: '16px',
  fontWeight: '700',
  marginBottom: '16px',
  textAlign: 'center',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  position: 'relative',
  paddingBottom: '8px',
};

const avatarStyle = {
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  fontWeight: 'bold',
  color: '#fff',
  flexShrink: 0,
  border: '2px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
};

const customerAvatarStyle = {
  ...avatarStyle,
  background: 'linear-gradient(135deg, #6C47FF, #9D50FF)',
};

const managerAvatarStyle = {
  ...avatarStyle,
  background: 'linear-gradient(135deg, #4CAF50, #66BB6A)',
};

const systemAvatarStyle = {
  ...avatarStyle,
  background: 'linear-gradient(135deg, #757575, #9E9E9E)',
};

const expandedSectionStyle = {
  marginTop: '12px',
  padding: '16px',
  borderRadius: '8px',
  background: 'rgba(255, 255, 255, 0.03)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  animation: 'fadeInUp 0.3s ease-out',
};

const toggleSwitchStyle = {
  position: 'relative',
  display: 'inline-block',
  width: '50px',
  height: '26px',
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '13px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  border: '1px solid rgba(255, 255, 255, 0.2)',
};

const toggleSliderStyle = {
  position: 'absolute',
  top: '2px',
  left: '2px',
  width: '22px',
  height: '22px',
  borderRadius: '50%',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '11px',
  fontWeight: 'bold',
  color: '#fff',
};

const tagsContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginTop: '12px',
};

const tagStyle = {
  padding: '6px 12px',
  borderRadius: '16px',
  background: 'rgba(108, 71, 255, 0.1)',
  border: '1px solid rgba(108, 71, 255, 0.3)',
  color: '#6C47FF',
  fontSize: '12px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  userSelect: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
};

const selectedTagStyle = {
  ...tagStyle,
  background: 'linear-gradient(135deg, #6C47FF, #9D50FF)',
  color: '#fff',
  border: '1px solid #6C47FF',
  boxShadow: '0 2px 8px rgba(108, 71, 255, 0.3)',
  transform: 'translateY(-1px)',
};

const expandArrowStyle = {
  position: 'absolute',
  top: '16px',
  right: '16px',
  fontSize: '14px',
  color: 'rgba(255, 255, 255, 0.6)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  zIndex: 3,
  userSelect: 'none',
};

const commentButtonStyle = {
  marginTop: '12px',
  padding: '8px 16px',
  borderRadius: '8px',
  border: 'none',
  background: 'linear-gradient(135deg, #6C47FF, #9D50FF)',
  color: '#fff',
  fontSize: '14px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxShadow: '0 2px 8px rgba(108, 71, 255, 0.3)',
};



const AnalisChat = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatData, setChatData] = useState(null);
  const [expandedResults, setExpandedResults] = useState({});
  const [resultTags, setResultTags] = useState({});
  const [loadingTags, setLoadingTags] = useState({});
  const [selectedTags, setSelectedTags] = useState({});
  const [resultComments, setResultComments] = useState({});

  const getAuthorInitials = (message) => {
    const authorType = message.author?.type;
    const authorName = message.author?.name;
    
    if (authorType === 'system') {
      return 'S';
    } else if (authorType === 'customer') {
      if (authorName) {
        return authorName.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
      }
      return 'К';
    } else {
      if (authorName) {
        return authorName.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
      }
      return 'О';
    }
  };

  const getAvatarStyle = (message) => {
    const authorType = message.author?.type;
    
    if (authorType === 'system') {
      return systemAvatarStyle;
    } else if (authorType === 'customer') {
      return customerAvatarStyle;
    } else {
      return managerAvatarStyle;
    }
  };

  const fetchResultTags = async (question, resultId) => {
    if (!question) return;
    
    setLoadingTags(prev => ({ ...prev, [resultId]: true }));
    
    try {
      const tokens = localStorage.getItem('tokens');
      if (!tokens) {
        console.error('Токен не найден');
        return;
      }

      const { access } = JSON.parse(tokens);
      const encodedQuestion = encodeURIComponent(question);
      
      const response = await fetch(`https://cb-tools.qodeq.net/api/chatqa/result/tags?question=${encodedQuestion}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${access}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const tags = await response.json();
      setResultTags(prev => ({ ...prev, [resultId]: tags }));
      
    } catch (error) {
      console.error('Ошибка получения тегов:', error);
    } finally {
      setLoadingTags(prev => ({ ...prev, [resultId]: false }));
    }
  };

  const toggleResultExpansion = (resultId, question, decision) => {
    const isExpanded = expandedResults[resultId];
    
    setExpandedResults(prev => ({
      ...prev,
      [resultId]: !isExpanded
    }));
    
    // Загружаем теги при первом открытии, только если решение отрицательное
    if (!isExpanded && !resultTags[resultId] && !decision) {
      fetchResultTags(question, resultId);
    }
  };

  const toggleTagSelection = (resultId, tagObj) => {
    setSelectedTags(prev => {
      const resultTags = prev[resultId] || [];
      const isSelected = resultTags.some(tag => 
        (typeof tag === 'object' ? tag.id : tag) === (typeof tagObj === 'object' ? tagObj.id : tagObj)
      );
      
      return {
        ...prev,
        [resultId]: isSelected 
          ? resultTags.filter(tag => 
              (typeof tag === 'object' ? tag.id : tag) !== (typeof tagObj === 'object' ? tagObj.id : tagObj)
            )
          : [...resultTags, tagObj]
      };
    });
  };

  const submitAnalysis = async () => {
    // Формируем массив результатов в нужном формате
    const results = [];
    
    if (chatData.results) {
      Object.entries(chatData.results).forEach(([agentName, agentResults]) => {
        if (Array.isArray(agentResults)) {
          agentResults.forEach((result) => {
            const resultId = result.pk || `${agentName}-${agentResults.indexOf(result)}`;
            
            const resultData = {
              id: result.pk || 0,
              decision: result.decision,
              manager_comment: resultComments[resultId] || "",
              tags: (selectedTags[resultId] || []).map(tag => 
                typeof tag === 'object' ? tag.id : tag
              )
            };
            
            results.push(resultData);
          });
        }
      });
    }
    
    console.log('Результаты анализа:', results);
    
    try {
      const tokens = localStorage.getItem('tokens');
      if (!tokens) {
        Notify.failure('Токен не найден. Пожалуйста, войдите в систему.');
        return;
      }

      const { access } = JSON.parse(tokens);
      
      const response = await fetch('https://cb-tools.qodeq.net/api/chatqa/result/', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${access}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(results),
      });

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Ответ сервера:', responseData);
      
      // Перенаправляем на главную страницу (где форма получения чата)
      setChatData(null);
      setExpandedResults({});
      setResultTags({});
      setLoadingTags({});
      setSelectedTags({});
      setResultComments({});
      
    } catch (error) {
      console.error('Ошибка отправки анализа:', error);
      Notify.failure(`Ошибка при отправке анализа: ${error.message}`);
    }
  };

  const updateResultDecision = async (resultId, newDecision) => {
    // Здесь будет логика обновления решения
    console.log('Обновление решения:', resultId, newDecision);
    
    // Обновляем локальное состояние
    setChatData(prevData => {
      const newData = { ...prevData };
      
      // Находим и обновляем результат
      Object.keys(newData.results).forEach(agentName => {
        const agentResults = newData.results[agentName];
        if (Array.isArray(agentResults)) {
          const resultIndex = agentResults.findIndex(r => r.pk === resultId);
          if (resultIndex !== -1) {
            agentResults[resultIndex] = {
              ...agentResults[resultIndex],
              decision: newDecision
            };
          }
        }
      });
      
      return newData;
    });
    
    // Если решение стало положительным, очищаем выбранные теги
    if (newDecision) {
      setSelectedTags(prev => ({
        ...prev,
        [resultId]: []
      }));
    }
    
    // Загружаем теги если решение стало отрицательным и теги еще не загружены
    if (!newDecision && !resultTags[resultId]) {
      const question = chatData.results && Object.values(chatData.results).flat().find(r => r.pk === resultId)?.question;
      if (question) {
        fetchResultTags(question, resultId);
      }
    }
  };



  const handleGetChat = async () => {
    // Проверяем корректность диапазона только если обе даты указаны
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      alert('Дата начала не может быть позже даты окончания');
      return;
    }

    setLoading(true);
    
    try {
      const tokens = localStorage.getItem('tokens');
      if (!tokens) {
        alert('Токен не найден. Пожалуйста, войдите в систему.');
        setLoading(false);
        return;
      }

      const { access } = JSON.parse(tokens);
      
      // Формируем URL с параметрами
      let url = 'https://cb-tools.qodeq.net/api/chatqa/reviewed-chats/anonymous';
      const params = new URLSearchParams();
      
      if (startDate) {
        params.append('created_at_after', startDate);
      }
      
      if (endDate) {
        params.append('created_at_before', endDate);
      }
      
      if (params.toString()) {
        url += '?' + params.toString();
      }

      console.log('Отправка запроса:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${access}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log('Получен чат:', data);
      
      // Сохраняем данные чата
      setChatData(data);
      
    } catch (error) {
      console.error('Ошибка получения чата:', error);
      alert(`Ошибка при получении чата: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{animationStyles}</style>
      <Sidebar />
      <div style={mainBg}>
        {!chatData ? (
          // Форма для получения чата
          <div style={contentStyle}>
            <h1 style={{ color: '#fff', textAlign: 'center', fontSize: 40, marginBottom: '20px' }}>
              Анализ чатов
            </h1>
            
            <button
              onClick={handleGetChat}
              disabled={loading}
              style={{
                ...buttonStyle,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(76, 175, 80, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(76, 175, 80, 0.3)';
                }
              }}
            >
              {loading ? 'Получение...' : 'Получить Чат'}
            </button>

            <div style={dateContainerStyle}>
              <div style={dateFieldStyle}>
                <label style={labelStyle}>С:</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={{
                    ...inputStyle,
                    colorScheme: 'dark',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#6C47FF';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(108, 71, 255, 0.3)';
                  }}
                />
              </div>

              <div style={dateFieldStyle}>
                <label style={labelStyle}>По:</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  style={{
                    ...inputStyle,
                    colorScheme: 'dark',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#6C47FF';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(108, 71, 255, 0.3)';
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          // Отображение чата
          <div style={{ 
            width: '100%', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            height: '100%'
          }}>
            <div style={chatContainerStyle}>
              {/* Сообщения чата */}
              <div className="chat-scroll" style={messagesContainerStyle}>
                <h2 className="section-title" style={sectionTitleStyle}>Сообщения чата</h2>
                {chatData.messages && chatData.messages.length > 0 ? (
                  chatData.messages.map((message, index) => {
                    const authorType = message.author?.type;
                    const isCustomer = authorType === 'customer';
                    const isSystem = authorType === 'system';
                    
                    let messageStyleToUse;
                    if (isSystem) {
                      messageStyleToUse = systemMessageStyle;
                    } else if (isCustomer) {
                      messageStyleToUse = customerMessageStyle;
                    } else {
                      messageStyleToUse = managerMessageStyle;
                    }
                    
                    return (
                      <div key={index} style={{
                        display: 'flex',
                        gap: '12px',
                        marginBottom: '12px',
                        flexDirection: isSystem ? 'column' : (isCustomer ? 'row' : 'row-reverse'),
                        alignItems: isSystem ? 'center' : 'flex-start'
                      }}>
                        {/* Аватар */}
                        <div style={getAvatarStyle(message)}>
                          {getAuthorInitials(message)}
                        </div>
                        
                        {/* Сообщение */}
                        <div style={messageStyleToUse}>
                          {!isSystem && (
                            <div style={messageHeaderStyle}>
                              <span>
                                <strong>{message.author?.name || 'Неизвестно'}</strong>
                                <span style={{ marginLeft: '8px', color: 'rgba(255,255,255,0.4)' }}>
                                  ({message.author?.type || 'unknown'})
                                </span>
                              </span>
                              <span>
                                {message.created_at ? new Date(message.created_at).toLocaleString('ru-RU') : ''}
                              </span>
                            </div>
                          )}
                          <div style={isSystem ? {} : messageContentStyle}>
                            {message.text || 'Сообщение отсутствует'}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div style={{ 
                    color: 'rgba(255,255,255,0.6)', 
                    textAlign: 'center', 
                    padding: '40px 20px',
                    fontSize: '16px',
                    fontWeight: '500'
                  }}>
                    Сообщения не найдены
                  </div>
                )}
              </div>

              {/* Результаты анализа */}
              <div className="chat-scroll" style={resultsContainerStyle}>
                <h2 className="section-title" style={sectionTitleStyle}>Результаты анализа</h2>
                {chatData.results && Object.keys(chatData.results).length > 0 ? (
                  Object.entries(chatData.results).map(([agentName, agentResults]) => (
                    <div key={agentName} style={{ marginBottom: '24px' }}>
                      {/* Заголовок агента */}
                      <div style={{
                        color: '#9D50FF',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        marginBottom: '12px',
                        textAlign: 'center',
                        background: 'rgba(157, 80, 255, 0.1)',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid rgba(157, 80, 255, 0.3)'
                      }}>
                        {agentName}
                      </div>
                      
                      {/* Результаты агента */}
                      {agentResults && agentResults.length > 0 ? (
                        agentResults.map((result, index) => {
                          const resultId = result.pk || `${agentName}-${index}`;
                          const isExpanded = expandedResults[resultId];
                          
                          return (
                            <div key={resultId} className="result-item" style={{
                              ...resultItemStyle,
                              background: result.decision 
                                ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.15), rgba(76, 175, 80, 0.05))'
                                : 'linear-gradient(135deg, rgba(244, 67, 54, 0.15), rgba(244, 67, 54, 0.05))',
                              border: result.decision 
                                ? '1px solid rgba(76, 175, 80, 0.4)'
                                : '1px solid rgba(244, 67, 54, 0.4)',
                              boxShadow: result.decision
                                ? '0 4px 16px rgba(76, 175, 80, 0.12), inset 0 1px 0 rgba(255,255,255,0.1)'
                                : '0 4px 16px rgba(244, 67, 54, 0.12), inset 0 1px 0 rgba(255,255,255,0.1)',
                              cursor: 'pointer'
                            }}
                            onClick={() => toggleResultExpansion(resultId, result.question, result.decision)}
                            >
                              {/* Стрелочка открытия/закрытия */}
                              <div 
                                style={{
                                  ...expandArrowStyle,
                                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                  color: isExpanded ? '#6C47FF' : 'rgba(255, 255, 255, 0.6)',
                                }}
                                onMouseEnter={(e) => {
                                  e.stopPropagation();
                                  e.target.style.color = '#6C47FF';
                                  e.target.style.transform = isExpanded 
                                    ? 'rotate(180deg) scale(1.2)' 
                                    : 'rotate(0deg) scale(1.2)';
                                }}
                                onMouseLeave={(e) => {
                                  e.stopPropagation();
                                  e.target.style.color = isExpanded ? '#6C47FF' : 'rgba(255, 255, 255, 0.6)';
                                  e.target.style.transform = isExpanded 
                                    ? 'rotate(180deg) scale(1)' 
                                    : 'rotate(0deg) scale(1)';
                                }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                ▼
                              </div>

                              <div style={{ color: '#6C47FF', fontWeight: 'bold', marginBottom: '8px', fontSize: '13px' }}>
                                {result.question || `Результат ${index + 1}`}
                              </div>
                              <div style={{ color: '#fff', fontSize: '12px', marginBottom: '8px', lineHeight: '1.4' }}>
                                {result.explanation || 'Объяснение отсутствует'}
                              </div>
                              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                                <div style={{ 
                                  color: result.checked ? '#4CAF50' : '#FFC107', 
                                  fontSize: '11px'
                                }}>
                                  {result.checked ? 'Проверено' : 'Не проверено'}
                                </div>
                              </div>

                              {/* Разворачивающийся блок */}
                              {isExpanded && (
                                <div style={expandedSectionStyle} onClick={(e) => e.stopPropagation()}>
                                  {/* Переключатель решения */}
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                    <div style={{ color: '#fff', fontSize: '13px', fontWeight: 'bold' }}>
                                      Решение:
                                    </div>
                                    <div 
                                      style={{
                                        ...toggleSwitchStyle,
                                        background: result.decision 
                                          ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.3), rgba(76, 175, 80, 0.1))'
                                          : 'linear-gradient(135deg, rgba(244, 67, 54, 0.3), rgba(244, 67, 54, 0.1))',
                                        borderColor: result.decision ? 'rgba(76, 175, 80, 0.4)' : 'rgba(244, 67, 54, 0.4)'
                                      }}
                                      onClick={() => updateResultDecision(result.pk, !result.decision)}
                                    >
                                      {/* Круглый слайдер */}
                                      <div 
                                        style={{
                                          ...toggleSliderStyle,
                                          left: result.decision ? '2px' : '26px',
                                          background: result.decision 
                                            ? 'linear-gradient(135deg, #4CAF50, #66BB6A)'
                                            : 'linear-gradient(135deg, #F44336, #EF5350)',
                                        }}
                                      >
                                        {result.decision ? '✓' : '×'}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Блок тегов - показываем только при отрицательном решении */}
                                  {!result.decision && (
                                    <div>
                                      <div style={{ 
                                        color: '#fff', 
                                        fontSize: '13px', 
                                        fontWeight: 'bold', 
                                        marginBottom: '8px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                      }}>
                                        <span>Теги:</span>
                                        {selectedTags[resultId] && selectedTags[resultId].length > 0 && (
                                          <span style={{
                                            background: 'linear-gradient(135deg, #6C47FF, #9D50FF)',
                                            color: '#fff',
                                            padding: '2px 8px',
                                            borderRadius: '12px',
                                            fontSize: '11px',
                                            fontWeight: 'bold'
                                          }}>
                                            {selectedTags[resultId].length} выбрано
                                          </span>
                                        )}
                                      </div>
                                      {loadingTags[resultId] ? (
                                        <div style={{ color: '#6C47FF', fontSize: '12px', textAlign: 'center', padding: '10px' }}>
                                          Загрузка тегов...
                                        </div>
                                      ) : (
                                        <div style={tagsContainerStyle}>
                                          {resultTags[resultId] && resultTags[resultId].length > 0 ? (
                                            resultTags[resultId].map((tag, tagIndex) => {
                                              const tagName = typeof tag === 'string' ? tag : tag.name || tag.title || 'Тег';
                                              const tagId = typeof tag === 'object' ? tag.id : tag;
                                              const isSelected = selectedTags[resultId] && selectedTags[resultId].some(selectedTag => 
                                                (typeof selectedTag === 'object' ? selectedTag.id : selectedTag) === tagId
                                              );
                                              
                                              return (
                                                <span 
                                                  key={tagIndex} 
                                                  style={isSelected ? selectedTagStyle : tagStyle}
                                                  onClick={() => toggleTagSelection(resultId, tag)}
                                                  onMouseEnter={(e) => {
                                                    if (!isSelected) {
                                                      e.target.style.background = 'rgba(108, 71, 255, 0.2)';
                                                      e.target.style.transform = 'translateY(-1px)';
                                                    }
                                                  }}
                                                  onMouseLeave={(e) => {
                                                    if (!isSelected) {
                                                      e.target.style.background = 'rgba(108, 71, 255, 0.1)';
                                                      e.target.style.transform = 'translateY(0)';
                                                    }
                                                  }}
                                                >
                                                  {isSelected && <span style={{ fontSize: '10px' }}>✓</span>}
                                                  {tagName}
                                                </span>
                                              );
                                            })
                                          ) : (
                                            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontStyle: 'italic' }}>
                                              Теги не найдены
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {/* Поле комментария для результата */}
                                  <div style={{ marginTop: '16px' }}>
                                    <label style={{
                                      color: '#fff',
                                      fontSize: '12px',
                                      fontWeight: 'bold',
                                      marginBottom: '6px',
                                      display: 'block'
                                    }}>
                                      Комментарий:
                                    </label>
                                    <textarea
                                      style={{
                                        width: '100%',
                                        height: '60px',
                                        padding: '8px',
                                        borderRadius: '6px',
                                        border: '1px solid rgba(108, 71, 255, 0.3)',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        color: '#fff',
                                        fontSize: '12px',
                                        fontFamily: 'inherit',
                                        resize: 'none',
                                        outline: 'none',
                                        transition: 'border-color 0.2s ease, background-color 0.2s ease',
                                        boxSizing: 'border-box',
                                      }}
                                      value={resultComments[resultId] || ''}
                                      onChange={(e) => setResultComments(prev => ({
                                        ...prev,
                                        [resultId]: e.target.value
                                      }))}
                                      placeholder="Комментарий к этому результату..."
                                      onFocus={(e) => {
                                        e.target.style.borderColor = '#6C47FF';
                                        e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                                      }}
                                      onBlur={(e) => {
                                        e.target.style.borderColor = 'rgba(108, 71, 255, 0.3)';
                                        e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                                      }}
                                    />
                                  </div>
                                </div>
                               )}

                               {result.manager_comment && (
                              <div style={{ 
                                background: 'rgba(108, 71, 255, 0.2)', 
                                padding: '6px 8px', 
                                borderRadius: '4px',
                                marginBottom: '8px'
                              }}>
                                <div style={{ color: '#6C47FF', fontSize: '11px', marginBottom: '3px' }}>
                                  Комментарий менеджера:
                                </div>
                                <div style={{ color: '#fff', fontSize: '12px' }}>
                                  {result.manager_comment}
                                </div>
                              </div>
                            )}
                            {result.tags && result.tags.length > 0 && (
                              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                {result.tags.map((tag, tagIndex) => (
                                  <span key={tagIndex} style={{
                                    background: '#FFC107',
                                    color: '#000',
                                    padding: '2px 5px',
                                    borderRadius: '3px',
                                    fontSize: '10px',
                                    fontWeight: 'bold'
                                  }}>
                                    {typeof tag === 'string' ? tag : tag.name || tag.title || 'Тег'}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          );
                        })
                      ) : (
                        <div style={{ 
                          color: 'rgba(255,255,255,0.5)', 
                          textAlign: 'center', 
                          padding: '20px',
                          fontSize: '12px',
                          fontStyle: 'italic'
                        }}>
                          Нет результатов для {agentName}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div style={{ 
                    color: 'rgba(255,255,255,0.6)', 
                    textAlign: 'center', 
                    padding: '40px 20px',
                    fontSize: '16px',
                    fontWeight: '500'
                  }}>
                    Результаты анализа не найдены
                  </div>
                )}



                {/* Кнопка отправить */}
                {chatData.results && Object.keys(chatData.results).length > 0 && (
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    marginTop: '20px',
                    paddingBottom: '20px'
                  }}>
                    <button
                      onClick={submitAnalysis}
                      style={{
                        ...commentButtonStyle,
                        fontSize: '16px',
                        padding: '12px 24px',
                        minWidth: '120px',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 4px 12px rgba(108, 71, 255, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 2px 8px rgba(108, 71, 255, 0.3)';
                      }}
                    >
                      Отправить
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AnalisChat; 