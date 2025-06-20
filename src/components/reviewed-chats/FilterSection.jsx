import React from 'react';

const FilterSection = ({
  filtersVisible,
  setFiltersVisible,
  getActiveFiltersCount,
  chatColorFilter,
  setChatColorFilter,
  selectedProject,
  setSelectedProject,
  projectsData,
  loadingProjects,
  userTypeFilter,
  setUserTypeFilter,
  checkedFilter,
  setCheckedFilter,
  agentFilter,
  setAgentFilter,
  chatIdFilter,
  setChatIdFilter,
  threadIdFilter,
  setThreadIdFilter,
  createdAfterFilter,
  setCreatedAfterFilter,
  createdBeforeFilter,
  setCreatedBeforeFilter,
}) => {
  const filtersContainerStyle = {
    marginBottom: '25px',
    background: 'linear-gradient(135deg, rgba(108, 71, 255, 0.1) 0%, rgba(157, 80, 255, 0.05) 100%)',
    borderRadius: '16px',
    border: '1px solid rgba(108, 71, 255, 0.4)',
    boxShadow: '0 8px 32px rgba(108, 71, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  };

  const filtersHeaderStyle = {
    padding: '20px 25px',
    borderBottom: filtersVisible ? '1px solid rgba(108, 71, 255, 0.3)' : 'none',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  const filtersContentStyle = {
    padding: '25px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '25px',
    transition: 'all 0.3s ease',
  };

  const filterGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    padding: '20px',
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '12px',
    border: '1px solid rgba(108, 71, 255, 0.2)',
  };

  const filterLabelStyle = {
    color: '#fff',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '8px',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    letterSpacing: '0.5px',
  };

  const filterSelectStyle = {
    padding: '14px 45px 14px 18px',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.12) 50%, rgba(108, 71, 255, 0.08) 100%)',
    border: '2px solid rgba(108, 71, 255, 0.6)',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
    boxShadow: '0 6px 20px rgba(108, 71, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(12px)',
    outline: 'none',
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='m6 9 6 6 6-6'/%3e%3c/svg%3e")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 18px center',
    backgroundSize: '18px',
    marginTop: '10px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
  };

  const inputStyle = {
    padding: '12px 16px',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
    border: '1px solid rgba(108, 71, 255, 0.5)',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '14px',
    fontWeight: '500',
    width: '244px',
    boxShadow: '0 4px 15px rgba(108, 71, 255, 0.1)',
    backdropFilter: 'blur(8px)',
    outline: 'none',
    transition: 'all 0.2s ease',
    marginTop: '10px'
  };

  const dateInputStyle = {
    ...inputStyle,
    colorScheme: 'dark',
  };

  const clearButtonStyle = {
    padding: '8px 12px',
    background: 'rgba(244, 67, 54, 0.2)',
    border: '1px solid rgba(244, 67, 54, 0.5)',
    borderRadius: '6px',
    color: '#F44336',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginTop: '8px',
  };

  const toggleButtonStyle = {
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '5px',
    borderRadius: '50%',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
  };

  const activeFiltersCountStyle = {
    background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
    color: '#fff',
    fontSize: '12px',
    fontWeight: 'bold',
    padding: '4px 8px',
    borderRadius: '12px',
    minWidth: '20px',
    textAlign: 'center',
    marginLeft: '8px',
    boxShadow: '0 2px 8px rgba(255, 107, 107, 0.3)',
  };

  const optionStyle = {
    background: '#2a1a4a',
    color: '#fff',
    padding: '12px 16px',
    fontSize: '14px',
    fontWeight: '500',
    borderRadius: '8px',
    margin: '2px 0',
  };



  const handleSelectFocus = (e) => {
    e.target.style.borderColor = 'rgba(108, 71, 255, 1)';
    e.target.style.boxShadow = '0 0 0 3px rgba(108, 71, 255, 0.3), 0 8px 25px rgba(108, 71, 255, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)';
  };

  const handleSelectBlur = (e) => {
    e.target.style.borderColor = 'rgba(108, 71, 255, 0.6)';
    e.target.style.boxShadow = '0 6px 20px rgba(108, 71, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div style={filtersContainerStyle}>
      <div 
        style={filtersHeaderStyle}
        onClick={() => setFiltersVisible(!filtersVisible)}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(108, 71, 255, 0.05)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'transparent';
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h3 style={{
            margin: 0,
            color: '#fff',
            fontSize: '18px',
            fontWeight: '600',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            🔍 Фильтры
          </h3>
          {activeFiltersCount > 0 && (
            <span style={activeFiltersCountStyle}>
              {activeFiltersCount}
            </span>
          )}
        </div>
        <button
          style={{
            ...toggleButtonStyle,
            transform: filtersVisible ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(108, 71, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'none';
          }}
        >
          ⌄
        </button>
      </div>
      
      {filtersVisible && (
        <div style={filtersContentStyle}>
          {/* Группа 1: Базовые статусы */}
          <div style={filterGroupStyle}>
            <h4 style={{ margin: '0 0 10px 0', color: '#fff', fontSize: '16px' }}>🎯 Базовые фильтры</h4>
            
            <div>
              <span style={filterLabelStyle}>🎨 Chat Color</span>
              <select
                style={filterSelectStyle}
                value={chatColorFilter}
                onChange={(e) => setChatColorFilter(e.target.value)}
                onFocus={handleSelectFocus}
                onBlur={handleSelectBlur}
              >
                <option value="" style={optionStyle}>✨ Все цвета</option>
                <option value="green" style={optionStyle}>🟢 Зеленый</option>
                <option value="yellow" style={optionStyle}>🟡 Желтый</option>
                <option value="red" style={optionStyle}>🔴 Красный</option>
              </select>
            </div>

            <div>
              <span style={filterLabelStyle}>✅ Статус проверки</span>
              <select
                style={filterSelectStyle}
                value={checkedFilter}
                onChange={(e) => setCheckedFilter(e.target.value)}
                onFocus={handleSelectFocus}
                onBlur={handleSelectBlur}
              >
                <option value="" style={optionStyle}>📊 Все статусы</option>
                <option value="true" style={optionStyle}>✅ Проверено</option>
                <option value="false" style={optionStyle}>❌ Не проверено</option>
              </select>
            </div>


          </div>

          {/* Группа 2: Проект и пользователи */}
          <div style={filterGroupStyle}>
            <h4 style={{ margin: '0 0 10px 0', color: '#fff', fontSize: '16px' }}>🏢 Проекты и пользователи</h4>
            
            <div>
              <span style={filterLabelStyle}>🏢 Проект</span>
              <select
                style={filterSelectStyle}
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                disabled={loadingProjects}
                onFocus={!loadingProjects ? handleSelectFocus : undefined}
                onBlur={!loadingProjects ? handleSelectBlur : undefined}
              >
                <option value="" style={optionStyle}>
                  {loadingProjects ? '⏳ Загрузка...' : '📁 Все проекты'}
                </option>
                {projectsData && projectsData.length > 0 && projectsData.map((project) => (
                  <option key={project.pk} value={project.pk} style={optionStyle}>
                    🏢 {project.title || project.name || `Проект ${project.pk}`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <span style={filterLabelStyle}>👤 Тип пользователя</span>
              <select
                style={filterSelectStyle}
                value={userTypeFilter}
                onChange={(e) => setUserTypeFilter(e.target.value)}
                onFocus={handleSelectFocus}
                onBlur={handleSelectBlur}
              >
                <option value="" style={optionStyle}>👥 Все типы</option>
                <option value="vip" style={optionStyle}>⭐ VIP пользователи</option>
                <option value="other" style={optionStyle}>👤 Обычные пользователи</option>
              </select>
            </div>

            <div>
              <span style={filterLabelStyle}>🧑‍💼 Агент</span>
              <input
                type="text"
                style={inputStyle}
                value={agentFilter}
                onChange={(e) => setAgentFilter(e.target.value)}
                placeholder="Введите имя агента..."
              />
              {agentFilter && (
                <button
                  style={clearButtonStyle}
                  onClick={() => setAgentFilter('')}
                >
                  Очистить
                </button>
              )}
            </div>
          </div>

          {/* Группа 3: Идентификаторы */}
          <div style={filterGroupStyle}>
            <h4 style={{ margin: '0 0 10px 0', color: '#fff', fontSize: '16px' }}>🔢 Идентификаторы</h4>
            
            <div>
              <span style={filterLabelStyle}>💬 Chat ID</span>
              <input
                type="text"
                style={inputStyle}
                value={chatIdFilter}
                onChange={(e) => setChatIdFilter(e.target.value)}
                placeholder="Введите Chat ID..."
              />
              {chatIdFilter && (
                <button
                  style={clearButtonStyle}
                  onClick={() => setChatIdFilter('')}
                >
                  Очистить
                </button>
              )}
            </div>

            <div>
              <span style={filterLabelStyle}>🧵 Thread ID</span>
              <input
                type="text"
                style={inputStyle}
                value={threadIdFilter}
                onChange={(e) => setThreadIdFilter(e.target.value)}
                placeholder="Введите Thread ID..."
              />
              {threadIdFilter && (
                <button
                  style={clearButtonStyle}
                  onClick={() => setThreadIdFilter('')}
                >
                  Очистить
                </button>
              )}
            </div>
          </div>

          {/* Группа 4: Даты */}
          <div style={filterGroupStyle}>
            <h4 style={{ margin: '0 0 10px 0', color: '#fff', fontSize: '16px' }}>📅 Период создания</h4>
            
            <div>
              <span style={filterLabelStyle}>📅 Дата от</span>
              <input
                type="date"
                style={dateInputStyle}
                value={createdAfterFilter}
                onChange={(e) => setCreatedAfterFilter(e.target.value)}
              />
              {createdAfterFilter && (
                <button
                  style={clearButtonStyle}
                  onClick={() => setCreatedAfterFilter('')}
                >
                  Очистить
                </button>
              )}
            </div>

            <div>
              <span style={filterLabelStyle}>📅 Дата до</span>
              <input
                type="date"
                style={dateInputStyle}
                value={createdBeforeFilter}
                onChange={(e) => setCreatedBeforeFilter(e.target.value)}
              />
              {createdBeforeFilter && (
                <button
                  style={clearButtonStyle}
                  onClick={() => setCreatedBeforeFilter('')}
                >
                  Очистить
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSection; 