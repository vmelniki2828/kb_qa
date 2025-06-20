import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import FilterSection from './FilterSection';

const mainBg = {
  minHeight: '100vh',
  background: '#12092A',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const contentStyle = {
  color: '#fff',
  maxWidth: '1400px',
  width: '100%',
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
};

const tdStyle = {
  padding: '12px 16px',
  borderBottom: '1px solid rgba(255,255,255,0.1)',
  color: 'rgba(255,255,255,0.9)',
  textAlign: 'center',
};

const statusBadgeStyle = {
  padding: '4px 8px',
  borderRadius: '12px',
  fontSize: '10px',
  fontWeight: 'bold',
  textTransform: 'uppercase',
};

const progressBarStyle = {
  width: '100px',
  height: '8px',
  background: 'rgba(255,255,255,0.1)',
  borderRadius: '4px',
  overflow: 'hidden',
  position: 'relative',
};

const progressFillStyle = {
  height: '100%',
  borderRadius: '4px',
  transition: 'width 0.3s ease',
};

const avatarStyle = {
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  marginRight: '8px',
  objectFit: 'cover',
  border: '2px solid rgba(108, 71, 255, 0.3)',
};

const defaultAvatarStyle = {
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
  marginRight: '8px',
  border: '2px solid rgba(108, 71, 255, 0.3)',
};

const userCellStyle = {
  ...tdStyle,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const paginationStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '20px',
  marginTop: '20px',
  padding: '20px 0',
};

const paginationButtonStyle = {
  background: 'rgba(108, 71, 255, 0.2)',
  border: '1px solid rgba(108, 71, 255, 0.5)',
  borderRadius: '50%',
  color: '#fff',
  width: '40px',
  height: '40px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
  fontWeight: 'bold',
  transition: 'all 0.2s ease',
};

const paginationButtonDisabledStyle = {
  ...paginationButtonStyle,
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: 'rgba(255,255,255,0.3)',
  cursor: 'not-allowed',
};

const pageInfoStyle = {
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  background: 'rgba(108, 71, 255, 0.3)',
  border: '1px solid rgba(108, 71, 255, 0.5)',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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

const filterAnimations = `
  @keyframes fadeInScale {
    0% { 
      opacity: 0; 
      transform: scale(0.8); 
    }
    100% { 
      opacity: 1; 
      transform: scale(1); 
    }
  }
  
  @keyframes pulse {
    0%, 100% { 
      transform: scale(1); 
    }
    50% { 
      transform: scale(1.05); 
    }
  }
  
  @keyframes slideIn {
    0% { 
      opacity: 0; 
      transform: translateX(-20px); 
    }
    100% { 
      opacity: 1; 
      transform: translateX(0); 
    }
  }
`;

const scrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(108, 71, 255, 0.6);
    border-radius: 4px;
    transition: background 0.2s ease;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(108, 71, 255, 0.8);
  }
  
  .custom-scrollbar::-webkit-scrollbar-corner {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const selectOptionStyles = `
  .custom-select {
    position: relative;
    color-scheme: dark;
  }
  
  .custom-select option {
    background: #1a0d3a !important;
    background-color: #1a0d3a !important;
    color: #fff !important;
    padding: 14px 20px !important;
    border-radius: 0 !important;
    margin: 0 !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
  }

  /* Стили для Webkit браузеров (Chrome, Safari) */
  .custom-select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: rgba(26, 13, 58, 0.9) !important;
    color-scheme: dark;
  }

  /* Переопределение для dropdown */
  .custom-select option {
    background: linear-gradient(135deg, #1a0d3a 0%, #2d1b5e 100%) !important;
    color: rgba(255, 255, 255, 0.9) !important;
    padding: 12px 16px !important;
    font-size: 14px !important;
    font-weight: 500 !important;
  }

  .custom-select option:hover {
    background: linear-gradient(135deg, #6C47FF 0%, #9D50FF 100%) !important;
    color: #ffffff !important;
  }

  .custom-select option:checked,
  .custom-select option:selected {
    background: linear-gradient(135deg, #6C47FF 0%, #9D50FF 100%) !important;
    color: #ffffff !important;
    font-weight: 600 !important;
  }

  /* Специальные стили для цветных опций */
  .custom-select .option-success {
    background: linear-gradient(135deg, rgba(76, 175, 80, 0.3) 0%, rgba(26, 13, 58, 0.8) 100%) !important;
    color: #4CAF50 !important;
  }

  .custom-select .option-success:hover {
    background: linear-gradient(135deg, rgba(76, 175, 80, 0.5) 0%, rgba(76, 175, 80, 0.2) 100%) !important;
    color: #66BB6A !important;
  }

  .custom-select .option-warning {
    background: linear-gradient(135deg, rgba(255, 193, 7, 0.3) 0%, rgba(26, 13, 58, 0.8) 100%) !important;
    color: #FFC107 !important;
  }

  .custom-select .option-warning:hover {
    background: linear-gradient(135deg, rgba(255, 193, 7, 0.5) 0%, rgba(255, 193, 7, 0.2) 100%) !important;
    color: #FFD54F !important;
  }

  .custom-select .option-error {
    background: linear-gradient(135deg, rgba(244, 67, 54, 0.3) 0%, rgba(26, 13, 58, 0.8) 100%) !important;
    color: #F44336 !important;
  }

  .custom-select .option-error:hover {
    background: linear-gradient(135deg, rgba(244, 67, 54, 0.5) 0%, rgba(244, 67, 54, 0.2) 100%) !important;
    color: #EF5350 !important;
  }

  .custom-select .option-info {
    background: linear-gradient(135deg, rgba(33, 150, 243, 0.3) 0%, rgba(26, 13, 58, 0.8) 100%) !important;
    color: #2196F3 !important;
  }

  .custom-select .option-info:hover {
    background: linear-gradient(135deg, rgba(33, 150, 243, 0.5) 0%, rgba(33, 150, 243, 0.2) 100%) !important;
    color: #42A5F5 !important;
  }

  .custom-select .option-vip {
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.3) 0%, rgba(26, 13, 58, 0.8) 100%) !important;
    color: #FFD700 !important;
  }

  .custom-select .option-vip:hover {
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.5) 0%, rgba(255, 215, 0, 0.2) 100%) !important;
    color: #FFEB3B !important;
  }

  .custom-select .option-default {
    background: linear-gradient(135deg, #1a0d3a 0%, #2d1b5e 100%) !important;
    color: rgba(255, 255, 255, 0.9) !important;
  }

  .custom-select .option-default:hover {
    background: linear-gradient(135deg, #6C47FF 0%, #9D50FF 100%) !important;
    color: #ffffff !important;
  }

  /* Дополнительные правила для Firefox */
  @-moz-document url-prefix() {
    .custom-select option {
      background-color: #1a0d3a !important;
      color: #fff !important;
    }
    
    .custom-select option:hover {
      background-color: #6C47FF !important;
      color: #fff !important;
    }
  }

  /* Правила для Edge/IE */
  .custom-select::-ms-expand {
    display: none;
  }

  /* Стили для Safari */
  @supports (-webkit-appearance: none) {
    .custom-select option {
      background: #1a0d3a !important;
      color: #fff !important;
    }
  }
`;

const editButtonStyle = {
  background: 'rgba(108, 71, 255, 0.2)',
  border: '1px solid rgba(108, 71, 255, 0.5)',
  borderRadius: '50%',
  color: '#fff',
  width: '32px',
  height: '32px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  transition: 'all 0.2s ease',
};

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

const messagesContainerStyle = {
  height: '500px',
  maxHeight: '500px',
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

const tabsContainerStyle = {
  display: 'flex',
  borderBottom: '1px solid rgba(108, 71, 255, 0.3)',
  marginBottom: '20px',
};

const tabButtonStyle = {
  flex: 1,
  padding: '12px 20px',
  background: 'transparent',
  border: 'none',
  color: 'rgba(255, 255, 255, 0.7)',
  fontSize: '14px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  borderBottom: '2px solid transparent',
};

const activeTabButtonStyle = {
  ...tabButtonStyle,
  color: '#6C47FF',
  borderBottom: '2px solid #6C47FF',
  background: 'rgba(108, 71, 255, 0.1)',
};

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

const toggleButtonStyle = {
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
  fontSize: '16px',
  fontWeight: 'bold',
  transition: 'all 0.2s ease',
};

const toggleButtonCheckedStyle = {
  ...toggleButtonStyle,
  background: 'rgba(76, 175, 80, 0.2)',
  border: '1px solid rgba(76, 175, 80, 0.5)',
  color: '#4CAF50',
};

// Добавляем стили в head документа
const injectStyles = () => {
  if (!document.getElementById('custom-select-styles')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'custom-select-styles';
    styleElement.textContent = `
      ${scrollbarStyles}
      ${selectOptionStyles}
    `;
    document.head.appendChild(styleElement);
  }
};

const ReviewedChats = () => {
  const [chatsData, setChatsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
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
  const [chatColorFilter, setChatColorFilter] = useState('');
  const [projectsData, setProjectsData] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [userTypeFilter, setUserTypeFilter] = useState('');
  const [agentFilter, setAgentFilter] = useState('');
  const [chatIdFilter, setChatIdFilter] = useState('');
  const [checkedFilter, setCheckedFilter] = useState('');
  const [threadIdFilter, setThreadIdFilter] = useState('');
  const [createdAfterFilter, setCreatedAfterFilter] = useState('');
  const [createdBeforeFilter, setCreatedBeforeFilter] = useState('');
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);

  // Внедряем стили при монтировании компонента
  useEffect(() => {
    injectStyles();
  }, []);

  const fetchReviewedChats = async (page = 1, colorFilter = '', projectFilter = '', userType = '', username = '', chatId = '', checked = '', status = '', threadId = '', createdAfter = '', createdBefore = '') => {
    // Предотвращаем дублирующиеся запросы
    if (isRequestInProgress) {
      console.log('Запрос уже выполняется, пропускаем...');
      return;
    }
    
    try {
      setIsRequestInProgress(true);
      setLoading(true);
      const tokens = localStorage.getItem('tokens');
      if (!tokens) {
        setError('Токен не найден');
        setLoading(false);
        return;
      }

      const { access } = JSON.parse(tokens);
      
      // Формируем URL с параметрами
      let url = `https://cb-tools.qodeq.net/api/chatqa/reviewed-chats?page=${page}`;
      if (colorFilter) {
        url += `&chat_color=${colorFilter}`;
      }
      if (projectFilter) {
        url += `&project=${projectFilter}`;
      }
      if (userType) {
        url += `&user_type=${userType}`;
      }
      if (username) {
        url += `&username=${encodeURIComponent(username)}`;
      }
      if (chatId) {
        url += `&chat_id=${encodeURIComponent(chatId)}`;
      }
      if (checked) {
        url += `&checked=${checked}`;
      }
      if (status) {
        url += `&status=${status}`;
      }
      if (threadId) {
        url += `&thread_id=${encodeURIComponent(threadId)}`;
      }
      if (createdAfter) {
        url += `&created_at_after=${createdAfter}`;
      }
      if (createdBefore) {
        url += `&created_at_before=${createdBefore}`;
      }
      
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
      setChatsData(data);
      setCurrentPage(page);
      console.log('✅ API запрос выполнен успешно');
      console.log('📊 Данные reviewed chats:', data);
      console.log('🌐 URL запроса:', url);
    } catch (err) {
      setError(err.message);
      console.error('Ошибка получения reviewed chats:', err);
    } finally {
      setLoading(false);
      setIsRequestInProgress(false);
    }
  };

  const fetchProjects = async () => {
    try {
      setLoadingProjects(true);
      const tokens = localStorage.getItem('tokens');
      if (!tokens) {
        console.error('Токен не найден для загрузки проектов');
        setLoadingProjects(false);
        return;
      }

      const { access } = JSON.parse(tokens);
      
      const response = await fetch('https://cb-tools.qodeq.net/api/chatqa/projects', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${access}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Ошибка загрузки проектов: ${response.status}`);
      }

      const data = await response.json();
      setProjectsData(data);
      console.log('Данные проектов:', data);
      console.log('Структура первого проекта:', data[0]);
      console.log('PK первого проекта:', data[0]?.pk);
      console.log('Title первого проекта:', data[0]?.title);
    } catch (err) {
      console.error('Ошибка получения проектов:', err);
    } finally {
      setLoadingProjects(false);
    }
  };

  // Инициализация - загружаем проекты и данные только один раз
  useEffect(() => {
    const initializeData = async () => {
      await fetchProjects();
      await fetchReviewedChats(1, '', '', '', '', '', '', '', '', '', '');
      setIsInitialized(true);
    };
    
    initializeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Объединенный useEffect для всех фильтров с оптимизированным debounce
  useEffect(() => {
    // Не выполняем запросы до инициализации
    if (!isInitialized) return;
    
    // Все фильтры с задержкой (текстовые поля)
    const debouncedFilters = [agentFilter, chatIdFilter, threadIdFilter];
    // Быстрые фильтры (select и checkbox)
    
    // Проверяем, есть ли изменения в текстовых полях
    const hasTextInput = debouncedFilters.some(filter => filter !== '');
    
    const fetchData = () => {
      setCurrentPage(1);
      fetchReviewedChats(1, chatColorFilter, selectedProject, userTypeFilter, agentFilter, chatIdFilter, checkedFilter, '', threadIdFilter, createdAfterFilter, createdBeforeFilter);
    };
    
    // Если есть активные текстовые фильтры - используем debounce
    if (hasTextInput) {
      const timeoutId = setTimeout(fetchData, 500);
      return () => clearTimeout(timeoutId);
    } else {
      // Для остальных фильтров - мгновенная загрузка
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, chatColorFilter, selectedProject, userTypeFilter, agentFilter, chatIdFilter, checkedFilter, threadIdFilter, createdAfterFilter, createdBeforeFilter]);

  const handlePrevPage = () => {
    if (chatsData?.previous) {
      const prevPage = currentPage - 1;
      fetchReviewedChats(prevPage, chatColorFilter, selectedProject, userTypeFilter, agentFilter, chatIdFilter, checkedFilter, '', threadIdFilter, createdAfterFilter, createdBeforeFilter);
    }
  };

  const handleNextPage = () => {
    if (chatsData?.next) {
      const nextPage = currentPage + 1;
      fetchReviewedChats(nextPage, chatColorFilter, selectedProject, userTypeFilter, agentFilter, chatIdFilter, checkedFilter, '', threadIdFilter, createdAfterFilter, createdBeforeFilter);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU') + ' | ' + date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDuration = (duration) => {
    if (!duration) return '00:00:00';
    
    // Парсим формат "00:08:13.207996"
    const parts = duration.split(':');
    if (parts.length >= 3) {
      const hours = parseInt(parts[0]) || 0;
      const minutes = parseInt(parts[1]) || 0;
      const seconds = parseInt(parts[2]) || 0;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    return duration;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'done':
        return { bg: 'rgba(76, 175, 80, 0.2)', color: '#4CAF50' };
      case 'pending':
        return { bg: 'rgba(255, 193, 7, 0.2)', color: '#FFC107' };
      case 'error':
        return { bg: 'rgba(244, 67, 54, 0.2)', color: '#F44336' };
      default:
        return { bg: 'rgba(158, 158, 158, 0.2)', color: '#9E9E9E' };
    }
  };

  const getProgressColor = (score) => {
    if (score >= 90) return 'linear-gradient(90deg, #4CAF50 0%, #8BC34A 100%)'; // 90-100% - зелёные
    if (score >= 80) return 'linear-gradient(90deg, #FFC107 0%, #FF9800 100%)'; // 80-89% - желтые
    return 'linear-gradient(90deg, #FF5722 0%, #F44336 100%)'; // 0-79% - красные
  };

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

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU');
  };

  const handleToggleChecked = async () => {
    try {
      const tokens = localStorage.getItem('tokens');
      if (!tokens) {
        console.error('Токен не найден');
        return;
      }

      const { access } = JSON.parse(tokens);
      const newCheckedValue = !selectedChat.checked;
      
      const response = await fetch(`https://cb-tools.qodeq.net/api/chatqa/reviewed-chats/${selectedChat.pk}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${access}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          checked: newCheckedValue
        }),
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      // Обновляем локальное состояние
      setSelectedChat(prev => ({
        ...prev,
        checked: newCheckedValue
      }));

      // Обновляем данные в основной таблице
      setChatsData(prev => ({
        ...prev,
        results: prev.results.map(chat => 
          chat.pk === selectedChat.pk 
            ? { ...chat, checked: newCheckedValue }
            : chat
        )
      }));

      console.log('Статус checked обновлен:', newCheckedValue);
      
    } catch (err) {
      console.error('Ошибка обновления статуса checked:', err);
    }
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
      
      // Обновляем selectedChat с новыми данными
      setSelectedChat(updatedChatData);

      // Также обновляем данные в основной таблице
      setChatsData(prev => ({
        ...prev,
        results: prev.results.map(chat => 
          chat.pk === selectedChat.pk 
            ? updatedChatData
            : chat
        )
      }));
      
    } catch (err) {
      console.error('Ошибка обновления данных чата:', err);
    }
  };

  // Функция для подсчета активных фильтров
  const getActiveFiltersCount = () => {
    let count = 0;
    if (chatColorFilter) count++;
    if (selectedProject) count++;
    if (userTypeFilter) count++;
    if (checkedFilter) count++;

    if (agentFilter) count++;
    if (chatIdFilter) count++;
    if (threadIdFilter) count++;
    if (createdAfterFilter) count++;
    if (createdBeforeFilter) count++;
    return count;
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

  const renderAnalytics = () => {
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
        ))}
      </div>
    );
  };

  const renderMessages = () => {
    if (!selectedChat.messages || selectedChat.messages.length === 0) {
      return (
        <div style={systemMessageStyle}>
          Нет сообщений
        </div>
      );
    }

    return (
      <div style={messagesContainerStyle} className="custom-scrollbar">
        {/* Заголовок чата */}
        <div style={systemMessageStyle}>
          Started - {formatDateTime(selectedChat.created_at)}
        </div>
        
        {selectedChat.messages.map((message, index) => {
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
        })}
      </div>
    );
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
          
          <div style={modalBodyStyle} className="custom-scrollbar">
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
                <span style={{
                  ...statusBadgeStyle,
                  background: getStatusColor(selectedChat.status).bg,
                  color: getStatusColor(selectedChat.status).color
                }}>
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
                <span style={infoLabelStyle}>Проверено:</span>
                <button
                  style={selectedChat.checked ? toggleButtonCheckedStyle : toggleButtonStyle}
                  onClick={handleToggleChecked}
                  onMouseEnter={(e) => {
                    if (selectedChat.checked) {
                      e.target.style.background = 'rgba(76, 175, 80, 0.4)';
                      e.target.style.transform = 'scale(1.1)';
                    } else {
                      e.target.style.background = 'rgba(244, 67, 54, 0.4)';
                      e.target.style.transform = 'scale(1.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedChat.checked) {
                      e.target.style.background = 'rgba(76, 175, 80, 0.2)';
                      e.target.style.transform = 'scale(1)';
                    } else {
                      e.target.style.background = 'rgba(244, 67, 54, 0.2)';
                      e.target.style.transform = 'scale(1)';
                    }
                  }}
                >
                  {selectedChat.checked ? '✓' : '✕'}
                </button>
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
                onMouseEnter={(e) => {
                  if (activeTab !== 'analytics') {
                    e.target.style.background = 'rgba(108, 71, 255, 0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== 'analytics') {
                    e.target.style.background = 'transparent';
                  }
                }}
              >
                Аналитика ({selectedChat.results ? Object.keys(selectedChat.results).length : 0})
              </button>
              <button
                style={activeTab === 'chat' ? activeTabButtonStyle : tabButtonStyle}
                onClick={() => setActiveTab('chat')}
                onMouseEnter={(e) => {
                  if (activeTab !== 'chat') {
                    e.target.style.background = 'rgba(108, 71, 255, 0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== 'chat') {
                    e.target.style.background = 'transparent';
                  }
                }}
              >
                Чат ({selectedChat.messages ? selectedChat.messages.length : 0})
              </button>
            </div>

            {activeTab === 'chat' ? renderMessages() : renderAnalytics()}
          </div>
        </div>
      </div>
    );
  };

  const renderTable = () => {
    if (!chatsData || !chatsData.results || chatsData.results.length === 0) {
      return <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)' }}>Нет данных для отображения</p>;
    }

    return (
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Пользователь</th>
            <th style={thStyle}>Thread ID</th>
            <th style={thStyle}>Chat ID</th>
            <th style={thStyle}>Оценка</th>
            <th style={thStyle}>Статус</th>
            <th style={thStyle}>Длительность</th>
            <th style={thStyle}>Дата создания</th>
            <th style={{...thStyle, width: '60px'}}></th>
          </tr>
        </thead>
        <tbody>
          {chatsData.results.map((chat, index) => {
            const userName = chat.username && chat.username.length > 0 ? chat.username.join(', ') : `User${chat.pk || index + 1}`;
            const score = chat.score || 0;
            
            return (
              <tr key={chat.pk || index} style={{ background: index % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                <td style={userCellStyle}>
                  {chat.photo ? (
                    <img 
                      src={chat.photo} 
                      alt={userName}
                      style={avatarStyle}
                      onError={(e) => {
                        // Если изображение не загрузилось, показываем аватар с инициалами
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  {!chat.photo && (
                    <div style={defaultAvatarStyle}>
                      {getInitials(chat.username)}
                    </div>
                  )}
                  {chat.photo && (
                    <div style={{...defaultAvatarStyle, display: 'none'}}>
                      {getInitials(chat.username)}
                    </div>
                  )}
                  <span>{userName}</span>
                </td>
                <td style={{...tdStyle, fontFamily: 'monospace', fontSize: '12px'}}>{chat.thread_id || 'N/A'}</td>
                <td style={{...tdStyle, fontFamily: 'monospace', fontSize: '12px'}}>{chat.chat_id || 'N/A'}</td>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={progressBarStyle}>
                      <div 
                        style={{
                          ...progressFillStyle,
                          width: `${score}%`,
                          background: getProgressColor(score)
                        }}
                      />
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{score}%</span>
                  </div>
                </td>
                <td style={{...tdStyle, textAlign: 'center'}}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: chat.checked 
                      ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.2) 0%, rgba(139, 195, 74, 0.2) 100%)'
                      : 'linear-gradient(135deg, rgba(244, 67, 54, 0.2) 0%, rgba(255, 87, 34, 0.2) 100%)',
                    border: chat.checked 
                      ? '2px solid rgba(76, 175, 80, 0.5)'
                      : '2px solid rgba(244, 67, 54, 0.5)',
                    color: chat.checked ? '#4CAF50' : '#F44336',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease',
                    cursor: 'default'
                  }}>
                    {chat.checked ? '✓' : '✕'}
                  </div>
                </td>
                <td style={{...tdStyle, fontFamily: 'monospace'}}>{formatDuration(chat.chat_duration)}</td>
                <td style={{...tdStyle, fontSize: '12px'}}>{formatDate(chat.created_at)}</td>
                <td style={{...tdStyle, textAlign: 'center'}}>
                  <button
                    style={editButtonStyle}
                    onClick={() => handleEditChat(chat.pk)}
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
                      width="14" 
                      height="14" 
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
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
              <div style={{ marginBottom: '30px' }}>
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
                <div style={{ marginBottom: '30px' }}>
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
                    maxHeight: '120px',
                    overflowY: 'auto',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.02)'
                  }} className="custom-scrollbar">
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

  return (
    <>
      <style>{spinnerKeyframes}</style>
      <style>{filterAnimations}</style>
      <style>{scrollbarStyles}</style>
      <Sidebar />
      <div style={mainBg}>
        <div style={contentStyle}>
          <h1 style={{ textAlign: 'center', fontSize: 32, marginBottom: '20px' }}>Reviewed Chats</h1>
          
          {chatsData && (
            <div style={{ marginBottom: '20px', color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>
              Всего чатов: {chatsData.count || 0}
            </div>
          )}
          
          {loading && (
            <div style={spinnerContainerStyle}>
              <div style={spinnerStyle}></div>
            </div>
          )}
          
          {error && <p style={{ color: '#F44336', textAlign: 'center' }}>Ошибка: {error}</p>}
          
          {!loading && chatsData && (
            <FilterSection
              filtersVisible={filtersVisible}
              setFiltersVisible={setFiltersVisible}
              getActiveFiltersCount={getActiveFiltersCount}
              chatColorFilter={chatColorFilter}
              setChatColorFilter={setChatColorFilter}
              selectedProject={selectedProject}
              setSelectedProject={setSelectedProject}
              projectsData={projectsData}
              loadingProjects={loadingProjects}
              userTypeFilter={userTypeFilter}
              setUserTypeFilter={setUserTypeFilter}
              checkedFilter={checkedFilter}
              setCheckedFilter={setCheckedFilter}
              agentFilter={agentFilter}
              setAgentFilter={setAgentFilter}
              chatIdFilter={chatIdFilter}
              setChatIdFilter={setChatIdFilter}
              threadIdFilter={threadIdFilter}
              setThreadIdFilter={setThreadIdFilter}
              createdAfterFilter={createdAfterFilter}
              setCreatedAfterFilter={setCreatedAfterFilter}
              createdBeforeFilter={createdBeforeFilter}
              setCreatedBeforeFilter={setCreatedBeforeFilter}
            />
          )}
          
          {!loading && chatsData && renderTable()}

          {!loading && chatsData && (chatsData.previous || chatsData.next) && (
            <div style={paginationStyle}>
              <button
                onClick={handlePrevPage}
                disabled={!chatsData.previous}
                style={chatsData.previous ? paginationButtonStyle : paginationButtonDisabledStyle}
                onMouseEnter={(e) => {
                  if (chatsData.previous) {
                    e.target.style.background = 'rgba(108, 71, 255, 0.4)';
                    e.target.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (chatsData.previous) {
                    e.target.style.background = 'rgba(108, 71, 255, 0.2)';
                    e.target.style.transform = 'translateY(0)';
                  }
                }}
              >
                ◀
              </button>

              <div style={pageInfoStyle}>
                {currentPage}
              </div>

              <button
                onClick={handleNextPage}
                disabled={!chatsData.next}
                style={chatsData.next ? paginationButtonStyle : paginationButtonDisabledStyle}
                onMouseEnter={(e) => {
                  if (chatsData.next) {
                    e.target.style.background = 'rgba(108, 71, 255, 0.4)';
                    e.target.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (chatsData.next) {
                    e.target.style.background = 'rgba(108, 71, 255, 0.2)';
                    e.target.style.transform = 'translateY(0)';
                  }
                }}
              >
                ▶
              </button>
            </div>
          )}
        </div>
      </div>
      
      {renderModal()}
      {renderResultModal()}
    </>
  );
};

export default ReviewedChats; 