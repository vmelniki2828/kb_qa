import React, { useState, useEffect, useCallback } from 'react';
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
  maxWidth: '1400px',
  width: '100%',
  padding: '20px',
};

const controlsStyle = {
  display: 'flex',
  gap: '20px',
  marginBottom: '30px',
  alignItems: 'flex-end',
  justifyContent: 'center',
  flexWrap: 'wrap',
};

const selectStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(108, 71, 255, 0.3)',
  borderRadius: '8px',
  color: '#fff',
  padding: '12px 15px',
  fontSize: '16px',
  minWidth: '140px',
  height: '44px',
  outline: 'none',
};

const buttonStyle = {
  background: 'linear-gradient(135deg, #6C47FF 0%, #9D50FF 100%)',
  border: 'none',
  borderRadius: '8px',
  color: '#fff',
  padding: '12px 24px',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  height: '44px',
  minWidth: '120px',
};



const statItemStyle = {
  background: 'rgba(108, 71, 255, 0.1)',
  border: '1px solid rgba(108, 71, 255, 0.3)',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '15px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const statLabelStyle = {
  fontSize: '16px',
  color: 'rgba(255,255,255,0.8)',
  fontWeight: '500',
};

const statValueStyle = {
  fontSize: '24px',
  color: '#fff',
  fontWeight: 'bold',
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

const MonthState = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filterType, setFilterType] = useState('all'); // all, total_chats, total_checked, green_chats, yellow_chats, red_chats
  const [minCount, setMinCount] = useState('');

  const months = [
    { value: 1, label: 'Январь' },
    { value: 2, label: 'Февраль' },
    { value: 3, label: 'Март' },
    { value: 4, label: 'Апрель' },
    { value: 5, label: 'Май' },
    { value: 6, label: 'Июнь' },
    { value: 7, label: 'Июль' },
    { value: 8, label: 'Август' },
    { value: 9, label: 'Сентябрь' },
    { value: 10, label: 'Октябрь' },
    { value: 11, label: 'Ноябрь' },
    { value: 12, label: 'Декабрь' },
  ];

  const years = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear - 5; year <= currentYear + 1; year++) {
    years.push(year);
  }

  const fetchStatistics = useCallback(async (year = selectedYear, month = selectedMonth, reload = 0) => {
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
      
      const response = await fetch(`https://cb-tools.qodeq.net/api/chatqa/result/statistics/${year}/${month}/?reload=${reload}`, {
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
      console.log('Статистика за месяц:', data);
      
    } catch (err) {
      setError(err.message);
      console.error('Ошибка получения статистики:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  const handleReloadStatistics = () => {
    fetchStatistics(selectedYear, selectedMonth, 1);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getFilteredData = (data) => {
    let filtered = [...data];

    // Фильтр по минимальному количеству
    if (minCount && !isNaN(minCount) && minCount > 0) {
      const minValue = parseInt(minCount);
      if (filterType !== 'all') {
        filtered = filtered.filter(item => (item[filterType] || 0) >= minValue);
      }
    }

    return filtered;
  };

  const getSortedData = (data) => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      // Обработка строк
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue, 'ru');
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      }

      // Обработка чисел
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        const comparison = aValue - bValue;
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      }

      // Обработка смешанных типов - приводим к строкам
      const aStr = String(aValue || '');
      const bStr = String(bValue || '');
      const comparison = aStr.localeCompare(bStr, 'ru');
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  };

  const getProcessedData = (data) => {
    const filtered = getFilteredData(data);
    return getSortedData(filtered);
  };

  const renderStatistics = () => {
    if (!statistics) return null;

    // Если есть поле data с массивом операторов
    if (statistics.data && Array.isArray(statistics.data)) {
      // Получаем все уникальные ключи для заголовков таблицы (исключаем id)
      const allKeys = statistics.data.length > 0 
        ? Object.keys(statistics.data[0]).filter(key => key !== 'id')
        : [];

              return (
          <div>
            {/* Итоговая статистика */}
            {(() => {
              const filteredData = getFilteredData(statistics.data);
              return filteredData.length > 0 && (
                <div style={{
                  marginBottom: '20px',
                  padding: '15px',
                  background: 'rgba(108, 71, 255, 0.1)',
                  border: '1px solid rgba(108, 71, 255, 0.3)',
                  borderRadius: '8px'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    gap: '15px',
                    flexWrap: 'wrap'
                  }}>
                    <div style={{ textAlign: 'center', minWidth: '100px' }}>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>
                        {filteredData.length}
                      </div>
                      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>
                        Операторов
                      </div>
                    </div>
                    <div style={{ textAlign: 'center', minWidth: '100px' }}>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>
                        {filteredData.reduce((sum, op) => sum + (op.total_chats || 0), 0)}
                      </div>
                      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>
                        Всего чатов
                      </div>
                    </div>
                    <div style={{ textAlign: 'center', minWidth: '100px' }}>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#4CAF50' }}>
                        {filteredData.reduce((sum, op) => sum + (op.green_chats || 0), 0)}
                      </div>
                      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>
                        Зелёных
                      </div>
                    </div>
                    <div style={{ textAlign: 'center', minWidth: '100px' }}>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#F44336' }}>
                        {filteredData.reduce((sum, op) => sum + (op.red_chats || 0), 0)}
                      </div>
                      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>
                        Красных
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
            
            <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            }}>
              {/* Заголовок таблицы */}
              <thead>
                <tr>
                  {allKeys.map(key => (
                    <th 
                      key={key} 
                      onClick={() => handleSort(key)}
                      style={{
                        background: 'rgba(108, 71, 255, 0.3)',
                        color: '#fff',
                        padding: '12px 16px',
                        textAlign: key === 'name' ? 'left' : 'center',
                        fontWeight: 'bold',
                        borderBottom: '2px solid rgba(108, 71, 255, 0.5)',
                        fontSize: '14px',
                        minWidth: key === 'name' ? '200px' : '100px',
                        whiteSpace: 'nowrap',
                        cursor: 'pointer',
                        userSelect: 'none',
                        transition: 'background 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(108, 71, 255, 0.5)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(108, 71, 255, 0.3)';
                      }}
                    >
                      {getStatLabel(key)}
                      {sortConfig.key === key && (
                        <span style={{ marginLeft: '8px', fontSize: '12px' }}>
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              
              {/* Тело таблицы */}
              <tbody>
                {getProcessedData(statistics.data).map((operator, index) => (
                  <tr key={operator.id} style={{
                    background: index % 2 === 0 
                      ? 'rgba(255,255,255,0.02)' 
                      : 'rgba(255,255,255,0.05)',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(108, 71, 255, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = index % 2 === 0 
                      ? 'rgba(255,255,255,0.02)' 
                      : 'rgba(255,255,255,0.05)';
                  }}>
                    {/* Все колонки */}
                    {allKeys.map(key => (
                      <td key={key} style={{
                        padding: '12px 16px',
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                        color: key === 'name' ? '#fff' : getValueColor(key, operator[key]),
                        textAlign: key === 'name' ? 'left' : 'center',
                        fontWeight: key === 'name' ? 'bold' : '500',
                        fontSize: '14px',
                        whiteSpace: 'nowrap'
                      }}>
                        {key === 'name' ? operator[key] : formatStatValue(key, operator[key])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
        );
    }

    // Если данные в старом формате (объект с ключами)
    return (
      <div>
        {Object.entries(statistics).map(([key, value]) => {
          // Если значение - объект, обрабатываем его специально
          if (typeof value === 'object' && value !== null) {
            return (
              <div key={key} style={{
                ...statItemStyle,
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '20px',
                marginBottom: '20px'
              }}>
                <span style={{
                  ...statLabelStyle,
                  fontSize: '18px',
                  marginBottom: '15px',
                  color: '#6C47FF',
                  fontWeight: 'bold'
                }}>
                  {getStatLabel(key)}
                </span>
                
                {/* Отображаем свойства объекта */}
                <div style={{ width: '100%' }}>
                  {Object.entries(value).map(([subKey, subValue]) => (
                    <div key={subKey} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      <span style={{
                        fontSize: '14px',
                        color: 'rgba(255,255,255,0.7)'
                      }}>
                        {getStatLabel(subKey)}
                      </span>
                      <span style={{
                        fontSize: '16px',
                        color: '#fff',
                        fontWeight: '500'
                      }}>
                        {formatStatValue(subKey, subValue)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          
          // Если значение - простое, отображаем как раньше
          return (
            <div key={key} style={statItemStyle}>
              <span style={statLabelStyle}>
                {getStatLabel(key)}
              </span>
              <span style={statValueStyle}>
                {formatStatValue(key, value)}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  const getStatLabel = (key) => {
    const labels = {
      // Основные показатели
      total_chats: 'Всего чатов',
      processed_chats: 'Обработанных чатов',
      pending_chats: 'Ожидающих обработки',
      average_score: 'Средняя оценка',
      positive_results: 'Положительных результатов',
      negative_results: 'Отрицательных результатов',
      checked_results: 'Проверенных результатов',
      unchecked_results: 'Непроверенных результатов',
      
      // Поля объектов
      id: 'ID',
      name: 'Название',
      total_checked: 'Всего проверено',
      green_chats: 'Зелёные чаты',
      yellow_chats: 'Жёлтые чаты',
      red_chats: 'Красные чаты',
      red_chats_percentage: 'Процент красных чатов',
    };
    return labels[key] || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatStatValue = (key, value) => {
    // Обработка процентных значений
    if ((key === 'average_score' || key === 'red_chats_percentage') && typeof value === 'number') {
      return `${value.toFixed(1)}%`;
    }
    
    // Обработка обычных чисел
    if (typeof value === 'number') {
      return value.toLocaleString('ru-RU');
    }
    
    // Обработка строк и других типов
    return value;
  };

  const getValueColor = (key, value) => {
    // Цветовое кодирование для разных типов чатов
    if (key === 'green_chats' && value > 0) {
      return '#4CAF50'; // Зелёный
    }
    if (key === 'yellow_chats' && value > 0) {
      return '#FFC107'; // Жёлтый
    }
    if (key === 'red_chats' && value > 0) {
      return '#F44336'; // Красный
    }
    if (key === 'red_chats_percentage' && typeof value === 'number') {
      if (value > 50) return '#F44336'; // Красный для высокого процента
      if (value > 20) return '#FF9800'; // Оранжевый для среднего
      return '#4CAF50'; // Зелёный для низкого
    }
    if (key === 'total_checked' && typeof value === 'number') {
      return value > 0 ? '#4CAF50' : '#F44336'; // Зелёный если есть проверенные, красный если нет
    }
    
    // Обычный белый цвет для остальных значений
    return '#fff';
  };

  return (
    <>
      <style>{spinnerKeyframes}</style>
      <Sidebar />
      <div style={mainBg}>
        <div style={contentStyle}>
          <h1 style={{ textAlign: 'center', fontSize: 32, marginBottom: '30px' }}>
            Статистика по месяцам
          </h1>
          
          <div style={controlsStyle}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
                Год:
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                style={selectStyle}
              >
                {years.map(year => (
                  <option key={year} value={year} style={{ background: '#12092A' }}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
                Месяц:
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                style={selectStyle}
              >
                {months.map(month => (
                  <option key={month.value} value={month.value} style={{ background: '#12092A' }}>
                    {month.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div style={{ display: 'flex', gap: '10px', alignItems: 'end' }}>
              <button
                onClick={handleReloadStatistics}
                style={{
                  ...buttonStyle,
                  background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(255, 107, 53, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Перезагрузить
              </button>
            </div>
          </div>

          {/* Фильтры */}
          {statistics && statistics.data && Array.isArray(statistics.data) && (
            <div style={{
              display: 'flex',
              gap: '20px',
              marginTop: '20px',
              marginBottom: '20px',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              padding: '15px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '8px',
              border: '1px solid rgba(108, 71, 255, 0.2)'
            }}>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px', color: '#fff', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="filterType"
                    value="all"
                    checked={filterType === 'all'}
                    onChange={(e) => setFilterType(e.target.value)}
                    style={{ accentColor: '#6C47FF' }}
                  />
                  Все
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px', color: '#fff', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="filterType"
                    value="total_chats"
                    checked={filterType === 'total_chats'}
                    onChange={(e) => setFilterType(e.target.value)}
                    style={{ accentColor: '#6C47FF' }}
                  />
                  Всего чатов
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px', color: '#fff', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="filterType"
                    value="total_checked"
                    checked={filterType === 'total_checked'}
                    onChange={(e) => setFilterType(e.target.value)}
                    style={{ accentColor: '#6C47FF' }}
                  />
                  Проверено
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px', color: '#4CAF50', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="filterType"
                    value="green_chats"
                    checked={filterType === 'green_chats'}
                    onChange={(e) => setFilterType(e.target.value)}
                    style={{ accentColor: '#4CAF50' }}
                  />
                  Зелёные чаты
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px', color: '#FFC107', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="filterType"
                    value="yellow_chats"
                    checked={filterType === 'yellow_chats'}
                    onChange={(e) => setFilterType(e.target.value)}
                    style={{ accentColor: '#FFC107' }}
                  />
                  Жёлтые чаты
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px', color: '#F44336', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="filterType"
                    value="red_chats"
                    checked={filterType === 'red_chats'}
                    onChange={(e) => setFilterType(e.target.value)}
                    style={{ accentColor: '#F44336' }}
                  />
                  Красные чаты
                </label>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
                  Минимум:
                </label>
                <input
                  type="number"
                  value={minCount}
                  onChange={(e) => setMinCount(e.target.value)}
                  placeholder="0"
                  min="0"
                  disabled={filterType === 'all'}
                  style={{
                    background: filterType === 'all' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(108, 71, 255, 0.3)',
                    borderRadius: '4px',
                    color: filterType === 'all' ? 'rgba(255,255,255,0.5)' : '#fff',
                    padding: '8px 12px',
                    fontSize: '14px',
                    width: '80px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
          )}

          {statistics && statistics.last_update && (
            <div style={{
              textAlign: 'center',
              marginBottom: '15px',
              color: 'rgba(255,255,255,0.4)',
              fontSize: '12px'
            }}>
              Последнее обновление: {new Date(statistics.last_update).toLocaleString('ru-RU', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </div>
          )}

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
    </>
  );
};

export default MonthState; 