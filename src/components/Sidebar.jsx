import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdHeadset, MdBarChart, MdMarkChatRead, MdLogout, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { 
  SidebarWrapper, 
  UserInfo,
  UserAvatar,
  UserName,
  UserDetails,
  UserDetailItem,
  UserBalance,
  SidebarMenu, 
  MenuItems,
  LogoutSection,
  MenuItem, 
  MenuToggle, 
  Overlay 
} from './Sidebar.styled';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('tokens');
    localStorage.removeItem('userData');
    navigate('/login');
    closeSidebar();
  };

  const getInitials = (username) => {
    return username ? username.charAt(0).toUpperCase() : '?';
  };

  const isActivePage = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <Overlay isOpen={isOpen} onClick={closeSidebar} />
      
      <SidebarWrapper isOpen={isOpen}>
        <MenuToggle onClick={toggleSidebar}>
          {isOpen ? <MdChevronLeft /> : <MdChevronRight />}
        </MenuToggle>
        
        {userData && (
          <UserInfo>
            <UserAvatar>
              {getInitials(userData.username)}
            </UserAvatar>
            <UserName>{userData.username}</UserName>
            <UserDetails>
              <UserDetailItem icon="👤">
                {userData.type}
              </UserDetailItem>
              <UserDetailItem icon="🏢">
                {userData.department}
              </UserDetailItem>
              <UserDetailItem icon="⭐">
                {userData.grade}
              </UserDetailItem>
            </UserDetails>
            <UserBalance>
              <div className="balance-label">Баланс</div>
              <div className="balance-value">{userData.balance}</div>
            </UserBalance>
          </UserInfo>
        )}
        
        <SidebarMenu>
          <MenuItems>
            <MenuItem 
              href="#" 
              onClick={() => handleNavigation('/reviewed_chats')} 
              title="Reviewed Chats"
              isActive={isActivePage('/reviewed_chats')}
            >
              <MdHeadset />
            </MenuItem>
            <MenuItem 
              href="#" 
              onClick={() => handleNavigation('/month_state')} 
              title="Month State"
              isActive={isActivePage('/month_state')}
            >
              <MdBarChart />
            </MenuItem>
            <MenuItem 
              href="#" 
              onClick={() => handleNavigation('/analis_chat')} 
              title="Обработка чатов"
              isActive={isActivePage('/analis_chat')}
            >
              <MdMarkChatRead />
            </MenuItem>
          </MenuItems>
          
          <LogoutSection>
            <MenuItem href="#" onClick={handleLogout} title="Выход">
              <MdLogout />
            </MenuItem>
          </LogoutSection>
        </SidebarMenu>
      </SidebarWrapper>
    </>
  );
};

export default Sidebar; 