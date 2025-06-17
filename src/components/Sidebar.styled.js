import styled from 'styled-components';

export const SidebarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: ${props => props.isOpen ? '0' : '-280px'};
  width: 280px;
  height: 100vh;
  background: rgba(18, 9, 42, 0.95);
  backdrop-filter: blur(10px);
  transition: left 0.3s ease;
  z-index: 1000;
  box-shadow: ${props => props.isOpen ? '2px 0 8px rgba(0,0,0,0.3)' : 'none'};
  display: flex;
  flex-direction: column;
`;

export const UserInfo = styled.div`
  padding: 24px 20px;
  background: linear-gradient(135deg, rgba(108, 71, 255, 0.2) 0%, rgba(18, 9, 42, 0.8) 100%);
  border-bottom: 1px solid rgba(108, 71, 255, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #6c47ff, #9d7bff, #6c47ff);
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;

export const UserAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6c47ff, #9d7bff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin-bottom: 12px;
  box-shadow: 0 4px 12px rgba(108, 71, 255, 0.3);
`;

export const UserName = styled.h3`
  margin: 0 0 12px 0;
  font-size: 1.3rem;
  color: #fff;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
`;

export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const UserDetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.8);
  padding: 4px 0;
  
  &::before {
    content: '${props => props.icon}';
    font-size: 14px;
    color: #6c47ff;
    min-width: 16px;
  }
`;

export const UserBalance = styled.div`
  margin-top: 8px;
  padding: 8px 12px;
  background: rgba(108, 71, 255, 0.2);
  border-radius: 8px;
  border: 1px solid rgba(108, 71, 255, 0.3);
  text-align: center;
  
  .balance-label {
    font-size: 0.75rem;
    color: rgba(255,255,255,0.6);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .balance-value {
    font-size: 1.1rem;
    font-weight: bold;
    color: #6c47ff;
    margin-top: 2px;
  }
`;

export const SidebarMenu = styled.nav`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const MenuItems = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LogoutSection = styled.div`
  margin-top: auto;
  border-top: 1px solid rgba(255,255,255,0.1);
`;

export const MenuItem = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 20px;
  color: #fff;
  text-decoration: none;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  transition: all 0.2s;
  font-size: 24px;
  min-height: 60px;
  position: relative;
  
  ${props => props.isActive && `
    background: rgba(108, 71, 255, 0.3);
    color: #6c47ff;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background: #6c47ff;
    }
  `}
  
  &:hover {
    background: rgba(108, 71, 255, 0.2);
    ${props => props.isActive && `
      background: rgba(108, 71, 255, 0.4);
    `}
  }
`;

export const MenuToggle = styled.button`
  position: absolute;
  top: 50%;
  right: -30px;
  transform: translateY(-50%);
  width: 30px;
  height: 60px;
  background: rgba(18, 9, 42, 0.95);
  border: 1px solid rgba(108, 71, 255, 0.3);
  border-left: none;
  border-radius: 0 8px 8px 0;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  cursor: pointer;
  z-index: 1001;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 0 4px rgba(0,0,0,0.2);
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  z-index: 999;
  opacity: ${props => props.isOpen ? '1' : '0'};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`; 