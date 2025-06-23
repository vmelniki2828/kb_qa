import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';

const mainBg = {
  minHeight: '100vh',
  background: '#12092A',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const contentStyle = {
  color: '#fff',
  maxWidth: '1200px',
  width: '100%',
  padding: '20px',
};

const backButtonStyle = {
  background: 'rgba(108, 71, 255, 0.2)',
  border: '1px solid rgba(108, 71, 255, 0.5)',
  borderRadius: '8px',
  color: '#fff',
  padding: '10px 20px',
  fontSize: '14px',
  cursor: 'pointer',
  marginBottom: '20px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  transition: 'all 0.2s ease',
};



const spinnerContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '200px',
};

const spinnerStyle = {
  width: '60px',
  height: '60px',
  border: '4px solid rgba(108, 71, 255, 0.2)',
  borderTop: '4px solid #6C47FF',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};

const spinnerKeyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const cardStyle = {
  background: 'rgba(108, 71, 255, 0.1)',
  border: '1px solid rgba(108, 71, 255, 0.3)',
  borderRadius: '16px',
  padding: '20px',
  marginBottom: '20px',
};

const dateInputStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(108, 71, 255, 0.3)',
  borderRadius: '8px',
  color: '#fff',
  padding: '8px 12px',
  fontSize: '14px',
  outline: 'none',
};

const qualityCardStyle = {
  ...cardStyle,
  background: 'linear-gradient(135deg, rgba(157, 80, 255, 0.15) 0%, rgba(108, 71, 255, 0.15) 100%)',
  border: '1px solid rgba(157, 80, 255, 0.3)',
};

const statBoxStyle = {
  textAlign: 'center',
  padding: '15px',
  background: 'rgba(255,255,255,0.05)',
  borderRadius: '12px',
  minWidth: '120px',
};

const bigNumberStyle = {
  fontSize: '36px',
  fontWeight: 'bold',
  margin: '0',
  lineHeight: '1',
};

const labelStyle = {
  fontSize: '12px',
  color: 'rgba(255,255,255,0.7)',
  marginTop: '8px',
  fontWeight: '500',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  background: 'rgba(255,255,255,0.05)',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
};

const thStyle = {
  background: 'rgba(108, 71, 255, 0.3)',
  color: '#fff',
  padding: '12px 16px',
  textAlign: 'center',
  fontWeight: 'bold',
  borderBottom: '2px solid rgba(108, 71, 255, 0.5)',
  fontSize: '14px',
};

const tdStyle = {
  padding: '12px 16px',
  borderBottom: '1px solid rgba(255,255,255,0.1)',
  color: 'rgba(255,255,255,0.9)',
  textAlign: 'center',
  fontSize: '14px',
};

// Стили модального окна
const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  backdropFilter: 'blur(5px)',
};

const modalContentStyle = {
  background: '#12092A',
  border: '1px solid rgba(108, 71, 255, 0.3)',
  borderRadius: '12px',
  width: '90%',
  maxWidth: '800px',
  maxHeight: '90vh',
  overflow: 'hidden',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
};

const modalHeaderStyle = {
  background: 'rgba(108, 71, 255, 0.2)',
  padding: '20px',
  borderBottom: '1px solid rgba(108, 71, 255, 0.3)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const modalBodyStyle = {
  padding: '20px',
  maxHeight: '70vh',
  overflowY: 'auto',
  color: '#fff',
};

// Стили для сообщений чата как в ReviewedChats
const messagesContainerStyleModal = {
  height: '400px',
  maxHeight: '400px',
  overflowY: 'auto',
  padding: '15px',
  background: 'rgba(255, 255, 255, 0.02)',
  borderRadius: '8px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
};

const messageStyle = {
  display: 'flex',
  marginBottom: '15px',
  alignItems: 'flex-start',
  gap: '10px',
};

const messageStyleLeft = {
  ...messageStyle,
  flexDirection: 'row',
  justifyContent: 'flex-start',
};

const messageStyleRight = {
  ...messageStyle,
  flexDirection: 'row-reverse',
  justifyContent: 'flex-start',
};

const messageAvatarStyle = {
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #6C47FF 0%, #9D50FF 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '12px',
  flexShrink: 0,
};

const messageAvatarStyleCustomer = {
  ...messageAvatarStyle,
  background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
};

const messageAvatarStyleOperator = {
  ...messageAvatarStyle,
  background: 'linear-gradient(135deg, #6C47FF 0%, #9D50FF 100%)',
};

const messageContentStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  maxWidth: '70%',
};

const messageContentStyleLeft = {
  ...messageContentStyle,
  alignItems: 'flex-start',
};

const messageContentStyleRight = {
  ...messageContentStyle,
  alignItems: 'flex-end',
};

const messageHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '4px',
};

const messageHeaderStyleLeft = {
  ...messageHeaderStyle,
  justifyContent: 'flex-start',
};

const messageHeaderStyleRight = {
  ...messageHeaderStyle,
  justifyContent: 'flex-end',
  flexDirection: 'row-reverse',
};

const messageAuthorStyle = {
  fontSize: '13px',
  fontWeight: 'bold',
  color: '#fff',
};

const messageTimeStyle = {
  fontSize: '11px',
  color: 'rgba(255, 255, 255, 0.5)',
  fontFamily: 'monospace',
};

const messageBubbleStyle = {
  background: 'rgba(255, 255, 255, 0.08)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '12px',
  padding: '10px 14px',
  fontSize: '14px',
  color: 'rgba(255, 255, 255, 0.9)',
  lineHeight: '1.4',
  maxWidth: '100%',
  wordWrap: 'break-word',
};

const messageBubbleStyleCustomer = {
  ...messageBubbleStyle,
  background: 'rgba(76, 175, 80, 0.15)',
  border: '1px solid rgba(76, 175, 80, 0.3)',
  borderRadius: '18px 18px 18px 4px',
};

const messageBubbleStyleOperator = {
  ...messageBubbleStyle,
  background: 'rgba(108, 71, 255, 0.15)',
  border: '1px solid rgba(108, 71, 255, 0.3)',
  borderRadius: '18px 18px 4px 18px',
};

const systemMessageStyle = {
  textAlign: 'center',
  padding: '8px',
  margin: '10px 0',
  fontSize: '12px',
  color: 'rgba(255, 255, 255, 0.6)',
  fontStyle: 'italic',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
};

const closeButtonStyle = {
  background: 'rgba(244, 67, 54, 0.2)',
  border: '1px solid rgba(244, 67, 54, 0.5)',
  borderRadius: '50%',
  color: '#F44336',
  width: '32px',
  height: '32px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '18px',
  fontWeight: 'bold',
  transition: 'all 0.2s ease',
};

const infoSectionStyle = {
  marginBottom: '20px',
  padding: '15px',
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '8px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
};

const infoRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 0',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
};

const infoLabelStyle = {
  color: 'rgba(255, 255, 255, 0.7)',
  fontSize: '14px',
  fontWeight: 'bold',
};

const infoValueStyle = {
  color: '#fff',
  fontSize: '14px',
  fontFamily: 'monospace',
};

const tabsContainerStyle = {
  display: 'flex',
  marginBottom: '20px',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
};

const tabButtonStyle = {
  background: 'transparent',
  border: 'none',
  color: 'rgba(255, 255, 255, 0.7)',
  padding: '12px 20px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 'bold',
  borderBottom: '2px solid transparent',
  transition: 'all 0.2s ease',
};

const activeTabButtonStyle = {
  ...tabButtonStyle,
  color: '#6C47FF',
  borderBottom: '2px solid #6C47FF',
  background: 'rgba(108, 71, 255, 0.1)',
};

// Стили для аналитики
const analyticsContainerStyle = {
  maxHeight: '400px',
  overflowY: 'auto',
};

const analystSectionStyle = {
  marginBottom: '20px',
  padding: '15px',
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '8px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
};

const analystHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '15px',
  paddingBottom: '10px',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
};

const analystNameStyle = {
  color: '#6C47FF',
  fontSize: '16px',
  fontWeight: 'bold',
};

const analystScoreStyle = {
  color: '#4CAF50',
  fontSize: '16px',
  fontWeight: 'bold',
};

const resultItemStyle = {
  padding: '10px',
  marginBottom: '8px',
  borderRadius: '6px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
};

const resultItemTrueStyle = {
  ...resultItemStyle,
  background: 'rgba(76, 175, 80, 0.1)',
  borderColor: 'rgba(76, 175, 80, 0.3)',
};

const resultItemFalseStyle = {
  ...resultItemStyle,
  background: 'rgba(244, 67, 54, 0.1)',
  borderColor: 'rgba(244, 67, 54, 0.3)',
};

const resultHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '5px',
};

const resultEditButtonStyle = {
  background: 'rgba(108, 71, 255, 0.2)',
  border: '1px solid rgba(108, 71, 255, 0.5)',
  borderRadius: '50%',
  color: '#fff',
  width: '24px',
  height: '24px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  transition: 'all 0.2s ease',
  marginLeft: '8px',
};

const decisionBadgeStyle = {
  padding: '2px 8px',
  borderRadius: '12px',
  fontSize: '10px',
  fontWeight: 'bold',
  textTransform: 'uppercase',
};

const decisionTrueBadgeStyle = {
  ...decisionBadgeStyle,
  background: 'rgba(76, 175, 80, 0.2)',
  color: '#4CAF50',
};

const decisionFalseBadgeStyle = {
  ...decisionBadgeStyle,
  background: 'rgba(244, 67, 54, 0.2)',
  color: '#F44336',
};

const analystTabsContainerStyle = {
  display: 'flex',
  marginBottom: '15px',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  overflowX: 'auto',
};

const analystTabButtonStyle = {
  padding: '8px 16px',
  background: 'transparent',
  border: 'none',
  color: 'rgba(255, 255, 255, 0.6)',
  fontSize: '12px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  borderBottom: '2px solid transparent',
  whiteSpace: 'nowrap',
  minWidth: 'fit-content',
};

const activeAnalystTabButtonStyle = {
  ...analystTabButtonStyle,
  color: '#6C47FF',
  borderBottom: '2px solid #6C47FF',
  background: 'rgba(108, 71, 255, 0.05)',
};

const AgentStats = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [statistics, setStatistics] = useState(null);
  const [personalChats, setPersonalChats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingChats, setLoadingChats] = useState(false);
  const [error, setError] = useState(null);
  const [chatsError, setChatsError] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('analytics');
  const [selectedAnalyst, setSelectedAnalyst] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [searchTags, setSearchTags] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentDecision, setCurrentDecision] = useState(true);
  const [currentComment, setCurrentComment] = useState('');
  const [dateFrom, setDateFrom] = useState(() => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    return firstDay.toISOString().split('T')[0];
  });
  const [dateTo, setDateTo] = useState(() => {
    const now = new Date();
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return lastDay.toISOString().split('T')[0];
  });

  const fetchAgentStatistics = async (fromDate = dateFrom, toDate = dateTo) => {
    try {
      setLoading(true);
      setError(null);
      
      const tokens = localStorage.getItem('tokens');
      if (!tokens) {
        setError('Токен не найден');
        setLoading(false);
        return;
      }

      const { access } = JSON.parse(tokens);
      
      // Формируем URL с параметрами дат
      const params = new URLSearchParams({
        created_at_after: fromDate,
        created_at_before: toDate,
        page: '1'
      });
      
      const url = `https://cb-tools.qodeq.net/api/chatqa/result/statistics/${id}/?${params.toString()}`;
      console.log('Запрос к API статистики:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${access}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      const data = await response.json();
      setStatistics(data);
      console.log('Статистика агента:', data);
      
    } catch (err) {
      setError(err.message);
      console.error('Ошибка получения статистики агента:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPersonalChats = async (fromDate = dateFrom, toDate = dateTo) => {
    try {
      setLoadingChats(true);
      setChatsError(null);
      
      const tokens = localStorage.getItem('tokens');
      if (!tokens) {
        setChatsError('Токен не найден');
        setLoadingChats(false);
        return;
      }

      const { access } = JSON.parse(tokens);
      
      // Формируем URL с параметрами дат
      const params = new URLSearchParams({
        created_at_after: fromDate,
        created_at_before: toDate,
        page: '1'
      });
      
      const url = `https://cb-tools.qodeq.net/api/chatqa/reviewed-chats/personal/${id}/?${params.toString()}`;
      console.log('Запрос к API персональных чатов:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${access}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      const data = await response.json();
      setPersonalChats(data);
      console.log('Персональные чаты агента:', data);
      
    } catch (err) {
      setChatsError(err.message);
      console.error('Ошибка получения персональных чатов:', err);
    } finally {
      setLoadingChats(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchAgentStatistics();
      fetchPersonalChats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dateFrom, dateTo]);





  const getValueColor = (key, value) => {
    if (key === 'green_chats' && value > 0) {
      return '#4CAF50';
    }
    if (key === 'yellow_chats' && value > 0) {
      return '#FFC107';
    }
    if (key === 'red_chats' && value > 0) {
      return '#F44336';
    }
    if (key === 'red_chats_percentage' && typeof value === 'number') {
      if (value > 50) return '#F44336';
      if (value > 20) return '#FF9800';
      return '#4CAF50';
    }
    if (key === 'total_checked' && typeof value === 'number') {
      return value > 0 ? '#4CAF50' : '#F44336';
    }
    if (key === 'grade' && typeof value === 'number') {
      if (value >= 90) return '#4CAF50'; // Зеленый для отличных оценок
      if (value >= 80) return '#FFC107'; // Желтый для хороших оценок
      if (value >= 70) return '#FF9800'; // Оранжевый для удовлетворительных
      return '#F44336'; // Красный для плохих оценок
    }
    if (key === 'total_issues' && typeof value === 'number') {
      return value > 0 ? '#F44336' : '#4CAF50';
    }
    
    return '#fff';
  };

  const handleEditChat = async (chatPk) => {
    try {
      const tokens = localStorage.getItem('tokens');
      if (!tokens) {
        console.error('Токен не найден');
        return;
      }

      const { access } = JSON.parse(tokens);
      
      const response = await fetch(`https://cb-tools.qodeq.net/api/chatqa/reviewed-chats/${chatPk}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${access}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      const chatData = await response.json();
      console.log('Данные чата для редактирования:', chatData);
      
      setSelectedChat(chatData);
      setIsModalOpen(true);
      
    } catch (err) {
      console.error('Ошибка получения данных чата:', err);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedChat(null);
    setActiveTab('analytics');
    setSelectedAnalyst(null);
    // Также закрываем модал результатов если он открыт
    if (isResultModalOpen) {
      closeResultModal();
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU');
  };

  // Функции для обработки сообщений чата как в ReviewedChats
  const getInitials = (username) => {
    if (!username) return 'U';
    if (Array.isArray(username) && username.length > 0) {
      const name = username[0]; // Берем первое имя из массива
      return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
    }
    if (typeof username === 'string') {
      return username.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
    }
    return 'U';
  };

  const getMessageAuthor = (message, chatUsername) => {
    // Если есть поле author в сообщении, используем его
    if (message.author) {
      // Если author - объект с полем name
      if (typeof message.author === 'object' && message.author.name) {
        return message.author.name;
      }
      // Если author - строка
      if (typeof message.author === 'string') {
        return message.author;
      }
    }
    
    // Определяем автора по содержимому или времени
    // Системные сообщения
    if (message.text && (
      message.text.includes('disconnected') || 
      message.text.includes('Customer disconnected') ||
      message.text.includes('Started -')
    )) {
      return 'Система';
    }
    
    // Если это первое сообщение или сообщение приветствия, скорее всего оператор
    if (message.text && (
      message.text.includes('Здравствуйте') ||
      message.text.includes('Вас приветствует')
    )) {
      return 'Оператор';
    }
    
    // Остальные сообщения от клиента
    if (chatUsername && Array.isArray(chatUsername) && chatUsername.length > 0) {
      return chatUsername[0];
    }
    
    return 'Клиент';
  };

  const getAuthorType = (message) => {
    if (message.author && typeof message.author === 'object' && message.author.type) {
      return message.author.type; // 'customer', 'operator', etc.
    }
    return 'unknown';
  };

  const handleEditResult = async (result) => {
    try {
      setSelectedResult(result);
      setCurrentDecision(result.decision);
      setCurrentComment(result.manager_comment || '');
      // Инициализируем selectedTags существующими тегами результата
      setSelectedTags(result.tags || []);
      setIsResultModalOpen(true);

      // Отправляем запрос для получения тегов
      if (result.question) {
        const tokens = localStorage.getItem('tokens');
        if (!tokens) {
          console.error('Токен не найден');
          return;
        }

        const { access } = JSON.parse(tokens);
        
        console.log('Текст вопроса для запроса:', result.question);
        console.log('Полный URL запроса:', `https://cb-tools.qodeq.net/api/chatqa/result/tags?question=${result.question}`);
        
        const response = await fetch(`https://cb-tools.qodeq.net/api/chatqa/result/tags?question=${result.question}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${access}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }

        const tagsData = await response.json();
        console.log('Данные тегов для вопроса:', tagsData);
        console.log('Тип данных тегов:', typeof tagsData);
        console.log('Является ли массивом:', Array.isArray(tagsData));
        
        // Обновляем selectedResult с полученными тегами
        let processedTags = [];
        if (Array.isArray(tagsData)) {
          processedTags = tagsData;
        } else if (tagsData?.tags && Array.isArray(tagsData.tags)) {
          processedTags = tagsData.tags;
        }
        
        setSelectedResult(prev => ({
          ...prev,
          availableTags: processedTags
        }));
      }
    } catch (err) {
      console.error('Ошибка получения тегов:', err);
    }
  };

  const closeResultModal = () => {
    setIsResultModalOpen(false);
    setSelectedResult(null);
    setSearchTags('');
    setSelectedTags([]);
    setCurrentDecision(true);
    setCurrentComment('');
  };

  const handleDecisionChange = (newDecision) => {
    setCurrentDecision(newDecision);
    // Если решение стало true, очищаем выбранные теги
    if (newDecision) {
      setSelectedTags([]);
    }
  };

  const handleTagSelect = (tag) => {
    // Проверяем не выбран ли уже этот тег
    const tagId = typeof tag === 'object' ? tag.id : tag;
    const isAlreadySelected = selectedTags.some(selectedTag => {
      const selectedTagId = typeof selectedTag === 'object' ? selectedTag.id : selectedTag;
      return selectedTagId === tagId;
    });
    
    if (!isAlreadySelected) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleTagRemove = (tagToRemove) => {
    const tagIdToRemove = typeof tagToRemove === 'object' ? tagToRemove.id : tagToRemove;
    setSelectedTags(selectedTags.filter(tag => {
      const tagId = typeof tag === 'object' ? tag.id : tag;
      return tagId !== tagIdToRemove;
    }));
  };

  const getFilteredTags = () => {
    if (!selectedResult?.availableTags) return [];
    return selectedResult.availableTags.filter(tag => {
      // Получаем текст тега для поиска
      const tagString = typeof tag === 'string' ? tag : (tag?.name || tag?.title || String(tag));
      
      // Проверяем соответствие поисковому запросу
      const matchesSearch = tagString.toLowerCase().includes(searchTags.toLowerCase());
      
      // Проверяем не выбран ли уже этот тег
      const tagId = typeof tag === 'object' ? tag.id : tag;
      const isAlreadySelected = selectedTags.some(selectedTag => {
        const selectedTagId = typeof selectedTag === 'object' ? selectedTag.id : selectedTag;
        return selectedTagId === tagId;
      });
      
      return matchesSearch && !isAlreadySelected;
    });
  };

  const refreshChatData = async () => {
    try {
      if (!selectedChat?.pk) {
        console.error('Нет выбранного чата для обновления');
        return;
      }

      const tokens = localStorage.getItem('tokens');
      if (!tokens) {
        console.error('Токен не найден');
        return;
      }

      const { access } = JSON.parse(tokens);
      
      const response = await fetch(`https://cb-tools.qodeq.net/api/chatqa/reviewed-chats/${selectedChat.pk}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${access}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      const updatedChatData = await response.json();
      console.log('Обновленные данные чата:', updatedChatData);
      
      // Обновляем selectedChat
      setSelectedChat(updatedChatData);
      
      // Также обновляем данные в персональных чатах если они есть
      if (personalChats?.results) {
        setPersonalChats(prev => ({
          ...prev,
          results: prev.results.map(chat => 
            chat.pk === selectedChat.pk 
              ? { ...chat, ...updatedChatData }
              : chat
          )
        }));
      }
      
    } catch (err) {
      console.error('Ошибка обновления данных чата:', err);
    }
  };

  const handleSaveResult = async () => {
    try {
      const tokens = localStorage.getItem('tokens');
      if (!tokens) {
        console.error('Токен не найден');
        return;
      }

      const { access } = JSON.parse(tokens);
      
      // Формируем объект для отправки
      const resultData = {
        id: selectedResult.pk,
        decision: currentDecision,
        manager_comment: currentComment
      };

      // Добавляем теги всегда
      if (currentDecision) {
        // Если решение true, отправляем пустой массив
        resultData.tags = [];
      } else {
        // Если решение false, отправляем выбранные теги
        resultData.tags = selectedTags.map(tag => {
          // Если tag это объект с id, используем id
          if (typeof tag === 'object' && tag.id !== undefined) {
            return tag.id;
          }
          // Если tag это число, используем как есть
          if (typeof tag === 'number') {
            return tag;
          }
          // Если tag это строка, пытаемся найти соответствующий объект в availableTags
          if (typeof tag === 'string' && selectedResult?.availableTags) {
            const foundTag = selectedResult.availableTags.find(availableTag => {
              const tagText = typeof availableTag === 'string' ? availableTag : (availableTag?.name || availableTag?.title || String(availableTag));
              return tagText === tag;
            });
            if (foundTag && typeof foundTag === 'object' && foundTag.id !== undefined) {
              return foundTag.id;
            }
          }
          // Fallback: возвращаем 0 если не удалось определить ID
          console.warn('Не удалось определить ID для тега:', tag);
          return 0;
        }).filter(id => id !== 0); // Убираем нулевые ID
      }

      console.log('Отправляем данные результата:', [resultData]);

      const response = await fetch('https://cb-tools.qodeq.net/api/chatqa/result/', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${access}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([resultData]),
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Результат сохранен:', responseData);

      // Обновляем данные чата после сохранения
      await refreshChatData();

      // Закрываем модальное окно
      closeResultModal();
      
    } catch (err) {
      console.error('Ошибка сохранения результата:', err);
    }
  };

  const renderModal = () => {
    if (!isModalOpen || !selectedChat) return null;

    return (
      <div style={modalOverlayStyle} onClick={closeModal}>
        <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
          <div style={modalHeaderStyle}>
            <h2 style={{ margin: 0, color: '#fff', fontSize: '18px' }}>
              Детали чата: {selectedChat.chat_id}
            </h2>
            <button
              style={closeButtonStyle}
              onClick={closeModal}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(244, 67, 54, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(244, 67, 54, 0.2)';
              }}
            >
              ×
            </button>
          </div>
          
          <div style={modalBodyStyle}>
            <div style={infoSectionStyle}>
              <h3 style={{ margin: '0 0 15px 0', color: '#6C47FF', fontSize: '16px' }}>Информация о чате</h3>
              
              <div style={infoRowStyle}>
                <span style={infoLabelStyle}>Chat ID:</span>
                <span style={infoValueStyle}>{selectedChat.chat_id}</span>
              </div>
              
              <div style={infoRowStyle}>
                <span style={infoLabelStyle}>Thread ID:</span>
                <span style={infoValueStyle}>{selectedChat.thread_id}</span>
              </div>
              
              <div style={infoRowStyle}>
                <span style={infoLabelStyle}>Пользователь:</span>
                <span style={infoValueStyle}>
                  {selectedChat.username && selectedChat.username.length > 0 
                    ? selectedChat.username.join(', ') 
                    : 'N/A'}
                </span>
              </div>
              
              <div style={infoRowStyle}>
                <span style={infoLabelStyle}>Статус:</span>
                <span style={infoValueStyle}>
                  {selectedChat.status}
                </span>
              </div>
              
              <div style={infoRowStyle}>
                <span style={infoLabelStyle}>Оценка:</span>
                <span style={{ ...infoValueStyle, color: '#4CAF50', fontWeight: 'bold' }}>
                  {selectedChat.score}%
                </span>
              </div>
              
              <div style={infoRowStyle}>
                <span style={infoLabelStyle}>Дата создания:</span>
                <span style={infoValueStyle}>{formatDateTime(selectedChat.created_at)}</span>
              </div>
              
              {selectedChat.comment && (
                <div style={infoRowStyle}>
                  <span style={infoLabelStyle}>Комментарий:</span>
                  <span style={infoValueStyle}>{selectedChat.comment}</span>
                </div>
              )}
            </div>

            <div style={tabsContainerStyle}>
              <button
                style={activeTab === 'analytics' ? activeTabButtonStyle : tabButtonStyle}
                onClick={() => setActiveTab('analytics')}
              >
                Аналитика ({selectedChat.results ? Object.keys(selectedChat.results).length : 0})
              </button>
              <button
                style={activeTab === 'chat' ? activeTabButtonStyle : tabButtonStyle}
                onClick={() => setActiveTab('chat')}
              >
                Чат ({selectedChat.messages ? selectedChat.messages.length : 0})
              </button>
            </div>

            {activeTab === 'chat' ? (
              <div style={messagesContainerStyleModal} className="custom-scrollbar">
                {/* Заголовок чата */}
                <div style={systemMessageStyle}>
                  Started - {formatDateTime(selectedChat.created_at)}
                </div>
                
                {selectedChat.messages && selectedChat.messages.length > 0 ? (
                  selectedChat.messages.map((message, index) => {
                    const author = getMessageAuthor(message, selectedChat.username);
                    const authorType = getAuthorType(message);
                    const isSystem = author === 'Система';
                    
                    if (isSystem) {
                      return (
                        <div key={index} style={systemMessageStyle}>
                          {message.text}
                        </div>
                      );
                    }
                    
                    const isCustomer = authorType === 'customer';
                    const isOperator = authorType === 'operator';
                    
                    return (
                      <div key={index} style={isCustomer ? messageStyleLeft : messageStyleRight}>
                        <div style={
                          isCustomer 
                            ? messageAvatarStyleCustomer 
                            : messageAvatarStyleOperator
                        }>
                          {getInitials(author)}
                        </div>
                        <div style={isCustomer ? messageContentStyleLeft : messageContentStyleRight}>
                          <div style={isCustomer ? messageHeaderStyleLeft : messageHeaderStyleRight}>
                            <span style={messageAuthorStyle}>
                              {author}
                              {isCustomer && (
                                <span style={{ 
                                  fontSize: '10px', 
                                  color: 'rgba(76, 175, 80, 0.8)', 
                                  marginLeft: '4px' 
                                }}>
                                  (клиент)
                                </span>
                              )}
                              {isOperator && (
                                <span style={{ 
                                  fontSize: '10px', 
                                  color: 'rgba(108, 71, 255, 0.8)', 
                                  marginLeft: '4px' 
                                }}>
                                  (оператор)
                                </span>
                              )}
                            </span>
                            <span style={messageTimeStyle}>
                              {new Date(message.created_at).toLocaleTimeString('ru-RU', { 
                                hour: '2-digit', 
                                minute: '2-digit',
                                second: '2-digit'
                              })}
                            </span>
                          </div>
                          <div style={
                            isCustomer 
                              ? messageBubbleStyleCustomer 
                              : messageBubbleStyleOperator
                          }>
                            {message.text || 'Нет текста'}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div style={systemMessageStyle}>
                    Нет сообщений
                  </div>
                )}
              </div>
                        ) : (
              (() => {
                if (!selectedChat.results) {
                  return (
                    <div style={{ padding: '20px', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
                      Нет данных аналитики
                    </div>
                  );
                }

                const analysts = Object.entries(selectedChat.results);
                
                // Если аналитиков больше 2, показываем переключатель
                if (analysts.length > 2) {
                  // Устанавливаем первого аналитика по умолчанию, если не выбран
                  const currentAnalyst = selectedAnalyst || analysts[0][0];
                  const currentAnalystData = selectedChat.results[currentAnalyst];

                  if (!selectedAnalyst) {
                    setSelectedAnalyst(currentAnalyst);
                  }

                  return (
                    <div style={analyticsContainerStyle} className="custom-scrollbar">
                      {/* Табы для переключения между аналитиками */}
                      <div style={analystTabsContainerStyle}>
                        {analysts.map(([analystName, analystData]) => (
                          <button
                            key={analystName}
                            style={currentAnalyst === analystName ? activeAnalystTabButtonStyle : analystTabButtonStyle}
                            onClick={() => setSelectedAnalyst(analystName)}
                            onMouseEnter={(e) => {
                              if (currentAnalyst !== analystName) {
                                e.target.style.background = 'rgba(108, 71, 255, 0.03)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (currentAnalyst !== analystName) {
                                e.target.style.background = 'transparent';
                              }
                            }}
                          >
                            {analystName} ({analystData.score}%)
                          </button>
                        ))}
                      </div>

                      {/* Отображение данных выбранного аналитика */}
                      <div style={analystSectionStyle}>
                        <div style={analystHeaderStyle}>
                          <span style={analystNameStyle}>{currentAnalyst}</span>
                          <span style={analystScoreStyle}>Оценка: {currentAnalystData.score}%</span>
                        </div>
                        
                        <div>
                          {currentAnalystData.results && currentAnalystData.results.map((result, index) => (
                            <div 
                              key={result.pk || index} 
                              style={result.decision ? resultItemTrueStyle : resultItemFalseStyle}
                            >
                              <div style={resultHeaderStyle}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <span style={result.decision ? decisionTrueBadgeStyle : decisionFalseBadgeStyle}>
                                    {result.decision ? 'Положительно' : 'Отрицательно'}
                                  </span>
                                  <span style={{
                                    fontSize: '11px',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '4px 10px',
                                    borderRadius: '12px',
                                    background: result.checked 
                                      ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.2) 0%, rgba(139, 195, 74, 0.2) 100%)'
                                      : 'linear-gradient(135deg, rgba(244, 67, 54, 0.2) 0%, rgba(255, 87, 34, 0.2) 100%)',
                                    border: result.checked 
                                      ? '1px solid rgba(76, 175, 80, 0.4)'
                                      : '1px solid rgba(244, 67, 54, 0.4)',
                                    color: result.checked ? '#4CAF50' : '#F44336',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                  }}>
                                    <span style={{ 
                                      fontSize: '12px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      width: '14px',
                                      height: '14px',
                                      borderRadius: '50%',
                                      background: result.checked ? '#4CAF50' : '#F44336',
                                      color: '#fff'
                                    }}>
                                      {result.checked ? '✓' : '✕'}
                                    </span>
                                    {result.checked ? 'Проверено' : 'Не проверено'}
                                  </span>
                                </div>
                                <button
                                  style={resultEditButtonStyle}
                                  onClick={() => handleEditResult(result)}
                                  onMouseEnter={(e) => {
                                    e.target.style.background = 'rgba(108, 71, 255, 0.4)';
                                    e.target.style.transform = 'scale(1.1)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.style.background = 'rgba(108, 71, 255, 0.2)';
                                    e.target.style.transform = 'scale(1)';
                                  }}
                                >
                                  <svg 
                                    width="10" 
                                    height="10" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                  >
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                    <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                  </svg>
                                </button>
                              </div>
                              {result.question && (
                                <div style={{ 
                                  fontSize: '14px', 
                                  color: '#fff', 
                                  lineHeight: '1.4',
                                  marginBottom: '8px',
                                  fontWeight: 'bold'
                                }}>
                                  {result.question}
                                </div>
                              )}
                              {result.explanation && (
                                <div style={{ 
                                  fontSize: '13px', 
                                  color: 'rgba(255,255,255,0.8)', 
                                  lineHeight: '1.4',
                                  marginBottom: '12px'
                                }}>
                                  {result.explanation}
                                </div>
                              )}
                              
                              {/* Комментарий менеджера */}
                              {result.manager_comment && (
                                <div style={{ 
                                  marginBottom: '12px',
                                  padding: '8px 12px',
                                  background: 'rgba(108, 71, 255, 0.1)',
                                  border: '1px solid rgba(108, 71, 255, 0.2)',
                                  borderRadius: '8px'
                                }}>
                                  <div style={{ 
                                    fontSize: '11px', 
                                    color: '#6C47FF', 
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    marginBottom: '4px'
                                  }}>
                                    Комментарий менеджера
                                  </div>
                                  <div style={{ 
                                    fontSize: '13px', 
                                    color: 'rgba(255,255,255,0.9)', 
                                    lineHeight: '1.4'
                                  }}>
                                    {result.manager_comment}
                                  </div>
                                </div>
                              )}

                              {/* Теги */}
                              {result.tags && result.tags.length > 0 && (
                                <div style={{ 
                                  marginBottom: '8px'
                                }}>
                                  <div style={{ 
                                    fontSize: '11px', 
                                    color: 'rgba(255,255,255,0.6)', 
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    marginBottom: '6px'
                                  }}>
                                    Теги
                                  </div>
                                  <div style={{ 
                                    display: 'flex', 
                                    flexWrap: 'wrap', 
                                    gap: '6px' 
                                  }}>
                                    {result.tags.map((tag, tagIndex) => {
                                      const tagText = typeof tag === 'string' ? tag : (tag?.name || tag?.title || String(tag));
                                      return (
                                        <span
                                          key={tagIndex}
                                          style={{
                                            background: 'rgba(255, 193, 7, 0.2)',
                                            border: '1px solid rgba(255, 193, 7, 0.4)',
                                            color: '#FFC107',
                                            padding: '3px 8px',
                                            borderRadius: '10px',
                                            fontSize: '11px',
                                            fontWeight: '500'
                                          }}
                                        >
                                          {tagText}
                                        </span>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                // Если аналитиков 2 или меньше, показываем как раньше
                return (
                  <div style={analyticsContainerStyle} className="custom-scrollbar">
                    {analysts.map(([analystName, analystData]) => (
                      <div key={analystName} style={analystSectionStyle}>
                        <div style={analystHeaderStyle}>
                          <span style={analystNameStyle}>{analystName}</span>
                          <span style={analystScoreStyle}>Оценка: {analystData.score}%</span>
                        </div>
                        
                        <div>
                          {analystData.results && analystData.results.map((result, index) => (
                            <div 
                              key={result.pk || index} 
                              style={result.decision ? resultItemTrueStyle : resultItemFalseStyle}
                            >
                              <div style={resultHeaderStyle}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <span style={result.decision ? decisionTrueBadgeStyle : decisionFalseBadgeStyle}>
                                    {result.decision ? 'Положительно' : 'Отрицательно'}
                                  </span>
                                  <span style={{
                                    fontSize: '11px',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '4px 10px',
                                    borderRadius: '12px',
                                    background: result.checked 
                                      ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.2) 0%, rgba(139, 195, 74, 0.2) 100%)'
                                      : 'linear-gradient(135deg, rgba(244, 67, 54, 0.2) 0%, rgba(255, 87, 34, 0.2) 100%)',
                                    border: result.checked 
                                      ? '1px solid rgba(76, 175, 80, 0.4)'
                                      : '1px solid rgba(244, 67, 54, 0.4)',
                                    color: result.checked ? '#4CAF50' : '#F44336',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                  }}>
                                    <span style={{ 
                                      fontSize: '12px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      width: '14px',
                                      height: '14px',
                                      borderRadius: '50%',
                                      background: result.checked ? '#4CAF50' : '#F44336',
                                      color: '#fff'
                                    }}>
                                      {result.checked ? '✓' : '✕'}
                                    </span>
                                    {result.checked ? 'Проверено' : 'Не проверено'}
                                  </span>
                                </div>
                                <button
                                  style={resultEditButtonStyle}
                                  onClick={() => handleEditResult(result)}
                                  onMouseEnter={(e) => {
                                    e.target.style.background = 'rgba(108, 71, 255, 0.4)';
                                    e.target.style.transform = 'scale(1.1)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.style.background = 'rgba(108, 71, 255, 0.2)';
                                    e.target.style.transform = 'scale(1)';
                                  }}
                                >
                                  <svg 
                                    width="10" 
                                    height="10" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                  >
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2-2v-7"/>
                                    <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                  </svg>
                                </button>
                              </div>
                              {result.question && (
                                <div style={{ 
                                  fontSize: '14px', 
                                  color: '#fff', 
                                  lineHeight: '1.4',
                                  marginBottom: '8px',
                                  fontWeight: 'bold'
                                }}>
                                  {result.question}
                                </div>
                              )}
                              {result.explanation && (
                                <div style={{ 
                                  fontSize: '13px', 
                                  color: 'rgba(255,255,255,0.8)', 
                                  lineHeight: '1.4',
                                  marginBottom: '12px'
                                }}>
                                  {result.explanation}
                                </div>
                              )}
                              
                              {/* Комментарий менеджера */}
                              {result.manager_comment && (
                                <div style={{ 
                                  marginBottom: '12px',
                                  padding: '8px 12px',
                                  background: 'rgba(108, 71, 255, 0.1)',
                                  border: '1px solid rgba(108, 71, 255, 0.2)',
                                  borderRadius: '8px'
                                }}>
                                  <div style={{ 
                                    fontSize: '11px', 
                                    color: '#6C47FF', 
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    marginBottom: '4px'
                                  }}>
                                    Комментарий менеджера
                                  </div>
                                  <div style={{ 
                                    fontSize: '13px', 
                                    color: 'rgba(255,255,255,0.9)', 
                                    lineHeight: '1.4'
                                  }}>
                                    {result.manager_comment}
                                  </div>
                                </div>
                              )}

                              {/* Теги */}
                              {result.tags && result.tags.length > 0 && (
                                <div style={{ 
                                  marginBottom: '8px'
                                }}>
                                  <div style={{ 
                                    fontSize: '11px', 
                                    color: 'rgba(255,255,255,0.6)', 
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    marginBottom: '6px'
                                  }}>
                                    Теги
                                  </div>
                                  <div style={{ 
                                    display: 'flex', 
                                    flexWrap: 'wrap', 
                                    gap: '6px' 
                                  }}>
                                    {result.tags.map((tag, tagIndex) => {
                                      const tagText = typeof tag === 'string' ? tag : (tag?.name || tag?.title || String(tag));
                                      return (
                                        <span
                                          key={tagIndex}
                                          style={{
                                            background: 'rgba(255, 193, 7, 0.2)',
                                            border: '1px solid rgba(255, 193, 7, 0.4)',
                                            color: '#FFC107',
                                            padding: '3px 8px',
                                            borderRadius: '10px',
                                            fontSize: '11px',
                                            fontWeight: '500'
                                          }}
                                        >
                                          {tagText}
                                        </span>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderResultModal = () => {
    if (!isResultModalOpen || !selectedResult) return null;

    return (
      <div style={modalOverlayStyle} onClick={closeResultModal}>
        <div style={{
          ...modalContentStyle,
          maxWidth: '700px',
          width: '90%'
        }} onClick={(e) => e.stopPropagation()}>
          <div style={modalHeaderStyle}>
            <h2 style={{ margin: 0, color: '#fff', fontSize: '18px' }}>
              {selectedResult.question || 'Редактирование результата'}
            </h2>
            <button
              style={closeButtonStyle}
              onClick={closeResultModal}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(244, 67, 54, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(244, 67, 54, 0.2)';
              }}
            >
              ×
            </button>
          </div>
          
          <div style={{
            ...modalBodyStyle,
            overflowY: 'auto',
            maxHeight: '70vh',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ 
              flex: 1,
              overflowY: 'auto',
              padding: '20px 20px 0 20px'
            }}>
              
              {/* Решение */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px',
                  color: '#fff',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}>
                  <input 
                    type="checkbox" 
                    checked={currentDecision}
                    onChange={(e) => handleDecisionChange(e.target.checked)}
                    style={{
                      width: '18px',
                      height: '18px',
                      accentColor: '#6C47FF',
                      cursor: 'pointer'
                    }}
                  />
                  Решение:
                </label>
              </div>

              {/* Комментарий */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block',
                  color: '#fff',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  marginBottom: '10px'
                }}>
                  Комментарий:
                </label>
                <textarea
                  placeholder="Enter your comment..."
                  value={currentComment}
                  onChange={(e) => setCurrentComment(e.target.value)}
                  style={{
                    width: '100%',
                    height: '80px',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#fff',
                    fontSize: '14px',
                    resize: 'none',
                    fontFamily: 'inherit',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.border = '1px solid #6C47FF';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                  }}
                />
              </div>

              {/* Блок тегов - показывается только если решение false */}
              {!currentDecision && (
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ 
                    display: 'block',
                    color: '#fff',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    marginBottom: '10px'
                  }}>
                    Поиск тегов
                  </label>
                  
                  {/* Поле поиска */}
                  <input
                    type="text"
                    placeholder="Search tags..."
                    value={searchTags}
                    onChange={(e) => setSearchTags(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#fff',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      outline: 'none',
                      boxSizing: 'border-box',
                      marginBottom: '15px'
                    }}
                    onFocus={(e) => {
                      e.target.style.border = '1px solid #6C47FF';
                    }}
                    onBlur={(e) => {
                      e.target.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                    }}
                  />

                  {/* Выбранные теги */}
                  {selectedTags.length > 0 && (
                    <div style={{ marginBottom: '15px' }}>
                      <div style={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: '8px' 
                      }}>
                        {selectedTags.map((tag, index) => {
                          const tagText = typeof tag === 'string' ? tag : (tag?.name || tag?.title || String(tag));
                          return (
                            <span
                              key={index}
                              style={{
                                background: '#6C47FF',
                                color: '#fff',
                                padding: '6px 12px',
                                borderRadius: '20px',
                                fontSize: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                cursor: 'pointer'
                              }}
                              onClick={() => handleTagRemove(tag)}
                            >
                              {tagText}
                              <span style={{ fontSize: '14px', fontWeight: 'bold' }}>×</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Список доступных тегов */}
                  <div style={{
                    height: '120px',
                    overflowY: 'auto',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.02)'
                  }}>
                    {getFilteredTags().map((tag, index) => {
                      const tagText = typeof tag === 'string' ? tag : (tag?.name || tag?.title || String(tag));
                      return (
                        <div
                          key={index}
                          style={{
                            padding: '12px 16px',
                            borderBottom: index < getFilteredTags().length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                            cursor: 'pointer',
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: '14px',
                            transition: 'background 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = 'rgba(108, 71, 255, 0.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'transparent';
                          }}
                          onClick={() => handleTagSelect(tag)}
                        >
                          {tagText}
                        </div>
                      );
                    })}
                    {getFilteredTags().length === 0 && searchTags && (
                      <div style={{
                        padding: '12px 16px',
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontSize: '14px',
                        fontStyle: 'italic'
                      }}>
                        Теги не найдены
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>

            {/* Кнопка сохранить - фиксированная внизу */}
            <div style={{
              padding: '20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              background: '#12092A'
            }}>
              <button
                style={{
                  background: '#4CAF50',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  width: '100%'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#45a049';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#4CAF50';
                  e.target.style.transform = 'translateY(0)';
                }}
                onClick={handleSaveResult}
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStatistics = () => {
    if (!statistics || !Array.isArray(statistics) || statistics.length === 0) return null;

    const agentData = statistics[0];

    return (
      <div>
        {/* Поля выбора даты */}
        <div style={{
          display: 'flex',
          gap: '15px',
          marginBottom: '20px',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ color: '#fff', fontSize: '14px', fontWeight: '500' }}>С:</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => {
                setDateFrom(e.target.value);
              }}
              style={dateInputStyle}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ color: '#fff', fontSize: '14px', fontWeight: '500' }}>По:</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => {
                setDateTo(e.target.value);
              }}
              style={dateInputStyle}
            />
          </div>
        </div>

        {/* Главная строка с картой качества и топ ошибками */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: window.innerWidth > 768 ? '2fr 1fr' : '1fr', 
          gap: '20px',
          marginBottom: '20px'
        }}>
          {/* Карта качества */}
          <div style={qualityCardStyle}>
            <h3 style={{
              margin: '0 0 20px 0',
              color: '#9D50FF',
              fontSize: '18px',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              Карта качества
            </h3>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '15px'
            }}>
              <div style={statBoxStyle}>
                <div style={{
                  ...bigNumberStyle,
                  color: '#fff'
                }}>
                  {agentData.total_checked}
                </div>
                <div style={labelStyle}>Проверено чатов</div>
              </div>
              
              <div style={statBoxStyle}>
                <div style={{
                  ...bigNumberStyle,
                  color: getValueColor('grade', agentData.grade)
                }}>
                  {agentData.grade}
                </div>
                <div style={labelStyle}>Средняя оценка</div>
              </div>
              
              <div style={statBoxStyle}>
                <div style={{
                  ...bigNumberStyle,
                  color: getValueColor('total_issues', agentData.total_issues)
                }}>
                  {agentData.total_issues}
                </div>
                <div style={labelStyle}>Найдено ошибок</div>
              </div>
            </div>
          </div>

          {/* Топ 5 ошибок */}
          <div style={cardStyle}>
            <h3 style={{
              margin: '0 0 15px 0',
              color: '#6C47FF',
              fontSize: '18px',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              Топ 5 ошибок
            </h3>
            
            {agentData.violated_questions && agentData.violated_questions.length > 0 ? (
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {agentData.violated_questions.slice(0, 5).map((violation, index) => {
                  const colors = ['#F44336', '#FF9800', '#FFC107', '#4CAF50', '#2196F3'];
                  return (
                    <div key={violation.question_id || index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '8px',
                      padding: '8px',
                      background: 'rgba(255,255,255,0.02)',
                      borderRadius: '6px'
                    }}>
                      <div style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: colors[index % colors.length],
                        flexShrink: 0
                      }}></div>
                      <div style={{ flex: 1, fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>
                        {violation.question_text.length > 40 
                          ? violation.question_text.substring(0, 40) + '...'
                          : violation.question_text}
                      </div>
                      <div style={{ 
                        fontSize: '12px', 
                        fontWeight: 'bold',
                        color: colors[index % colors.length]
                      }}>
                        {violation.violations}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                color: 'rgba(255,255,255,0.5)',
                fontSize: '14px',
                padding: '20px'
              }}>
                Нет данных об ошибках
              </div>
            )}
          </div>
        </div>

        {/* Детальная информация об ошибках (если есть) */}
        {agentData.violated_questions && agentData.violated_questions.length > 0 && (
          <div style={cardStyle}>
            <h3 style={{
              margin: '0 0 15px 0',
              color: '#F44336',
              fontSize: '18px',
              fontWeight: 'bold'
            }}>
              Детальная информация об ошибках ({agentData.violated_questions.length})
            </h3>
            
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {agentData.violated_questions.map((violation, index) => (
                <div key={violation.question_id || index} style={{
                  background: 'rgba(244, 67, 54, 0.05)',
                  border: '1px solid rgba(244, 67, 54, 0.2)',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '8px'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '10px'
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: '11px',
                        marginBottom: '4px'
                      }}>
                        ID: {violation.question_id}
                      </div>
                      <div style={{
                        color: '#fff',
                        fontSize: '13px',
                        lineHeight: '1.3'
                      }}>
                        {violation.question_text}
                      </div>
                    </div>
                    <div style={{
                      background: 'rgba(244, 67, 54, 0.2)',
                      borderRadius: '12px',
                      padding: '4px 8px',
                      minWidth: '40px',
                      textAlign: 'center'
                    }}>
                      <span style={{ 
                        color: '#F44336', 
                        fontWeight: 'bold',
                        fontSize: '12px'
                      }}>
                        {violation.violations}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Персональные чаты */}
        <div style={cardStyle}>
          <h3 style={{
            margin: '0 0 15px 0',
            color: '#6C47FF',
            fontSize: '18px',
            fontWeight: 'bold'
          }}>
            Персональные чаты
          </h3>
          
          {loadingChats && (
            <div style={spinnerContainerStyle}>
              <div style={spinnerStyle}></div>
            </div>
          )}
          
          {chatsError && (
            <p style={{ 
              color: '#F44336', 
              textAlign: 'center', 
              fontSize: '14px',
              background: 'rgba(244, 67, 54, 0.1)',
              border: '1px solid rgba(244, 67, 54, 0.3)',
              borderRadius: '8px',
              padding: '15px'
            }}>
              Ошибка загрузки чатов: {chatsError}
            </p>
          )}
          
          {!loadingChats && personalChats && (
            <div style={{ overflowX: 'auto' }}>
              {personalChats.results && personalChats.results.length > 0 ? (
                <table style={tableStyle}>
                  <thead>
                    <tr>
                      <th style={thStyle}>Дата</th>
                      <th style={thStyle}>Неделя</th>
                      <th style={thStyle}>Тег ошибок</th>
                      <th style={thStyle}>Длина</th>
                      <th style={thStyle}>Балл</th>
                      <th style={thStyle}>Комментарий</th>
                    </tr>
                  </thead>
                  <tbody>
                    {personalChats.results.map((chat, index) => (
                      <tr key={chat.pk || index} style={{
                        background: index % 2 === 0 
                          ? 'rgba(255,255,255,0.02)' 
                          : 'rgba(255,255,255,0.05)',
                        cursor: 'pointer',
                        transition: 'background 0.2s ease',
                      }}
                      onClick={() => handleEditChat(chat.pk)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(108, 71, 255, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = index % 2 === 0 
                          ? 'rgba(255,255,255,0.02)' 
                          : 'rgba(255,255,255,0.05)';
                      }}>
                        <td style={tdStyle}>
                          {chat.created_at ? new Date(chat.created_at).toLocaleDateString('ru-RU', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          }) : 'N/A'}
                        </td>
                        <td style={tdStyle}>{chat.week || 'N/A'}</td>
                        <td style={tdStyle}>
                          {chat.tags && chat.tags.length > 0 ? (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center' }}>
                              {chat.tags.slice(0, 3).map((tag, tagIndex) => (
                                <span key={tagIndex} style={{
                                  background: 'rgba(244, 67, 54, 0.2)',
                                  color: '#F44336',
                                  padding: '2px 6px',
                                  borderRadius: '8px',
                                  fontSize: '10px',
                                  fontWeight: 'bold',
                                  border: '1px solid rgba(244, 67, 54, 0.3)'
                                }}>
                                  {typeof tag === 'string' ? tag : (tag.name || tag.title || 'Ошибка')}
                                </span>
                              ))}
                              {chat.tags.length > 3 && (
                                <span style={{
                                  background: 'rgba(255,255,255,0.1)',
                                  color: 'rgba(255,255,255,0.7)',
                                  padding: '2px 6px',
                                  borderRadius: '8px',
                                  fontSize: '10px'
                                }}>
                                  +{chat.tags.length - 3}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>
                              Нет ошибок
                            </span>
                          )}
                        </td>
                        <td style={tdStyle}>
                          {chat.chat_duration ? (
                            <span style={{ color: 'rgba(255,255,255,0.9)' }}>
                              {chat.chat_duration.split('.')[0]} {/* Убираем миллисекунды */}
                            </span>
                          ) : 'N/A'}
                        </td>
                        <td style={tdStyle}>
                          {chat.score !== null && chat.score !== undefined ? (
                            <span style={{
                              color: chat.score >= 90 ? '#4CAF50' : 
                                     chat.score >= 80 ? '#FFC107' : 
                                     chat.score >= 70 ? '#FF9800' : '#F44336',
                              fontWeight: 'bold',
                              fontSize: '14px'
                            }}>
                              {chat.score}
                            </span>
                          ) : 'N/A'}
                        </td>
                        <td style={{...tdStyle, maxWidth: '200px', textAlign: 'left'}}>
                          {chat.comment ? (
                            <span style={{ 
                              color: 'rgba(255,255,255,0.9)',
                              fontSize: '12px',
                              lineHeight: '1.3',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}>
                              {chat.comment}
                            </span>
                          ) : (
                            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>
                              Без комментария
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{
                  textAlign: 'center',
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '14px',
                  padding: '20px'
                }}>
                  Нет данных о персональных чатах
                </div>
              )}
              
              {personalChats.count && (
                <div style={{
                  textAlign: 'center',
                  marginTop: '15px',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '14px'
                }}>
                  Всего чатов: {personalChats.count}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{spinnerKeyframes}</style>
      <Sidebar />
      <div style={mainBg}>
        <div style={contentStyle}>
          <button
            onClick={() => navigate('/month_state')}
            style={backButtonStyle}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(108, 71, 255, 0.3)';
              e.target.style.transform = 'translateX(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(108, 71, 255, 0.2)';
              e.target.style.transform = 'translateX(0)';
            }}
          >
            ← Назад к статистике по месяцам
          </button>

          <h1 style={{ textAlign: 'left', fontSize: 28, marginBottom: '20px', fontWeight: '400' }}>
            Приветствую вас, <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>
              {statistics && statistics.length > 0 && statistics[0].agents__name ? statistics[0].agents__name : `Agent ${id}`}
            </span>!
          </h1>
          
          {loading && (
            <div style={spinnerContainerStyle}>
              <div style={spinnerStyle}></div>
            </div>
          )}
          
          {error && (
            <p style={{ 
              color: '#F44336', 
              textAlign: 'center', 
              fontSize: '16px',
              background: 'rgba(244, 67, 54, 0.1)',
              border: '1px solid rgba(244, 67, 54, 0.3)',
              borderRadius: '8px',
              padding: '15px'
            }}>
              Ошибка: {error}
            </p>
          )}
          
          {!loading && statistics && renderStatistics()}
        </div>
      </div>
      
      {/* Модальное окно */}
      {renderModal()}
      {renderResultModal()}
    </>
  );
};

export default AgentStats; 