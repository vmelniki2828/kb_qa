import styled from 'styled-components';

export const LoginWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #12092A;
`;

export const Form = styled.form`
  background: rgba(255,255,255,0.02);
  padding: 40px 32px;
  border-radius: 12px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 320px;
`;

export const Title = styled.h2`
  color: #fff;
  text-align: center;
  margin-bottom: 8px;
`;

export const Input = styled.input`
  padding: 12px 16px;
  border-radius: 6px;
  border: none;
  outline: none;
  font-size: 1rem;
  background: #1a1033;
  color: #fff;
  margin-bottom: 8px;
  transition: box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(18,9,42,0.1);
  &:focus {
    box-shadow: 0 0 0 2px #6c47ff;
  }
`;

export const Button = styled.button`
  padding: 12px 0;
  border-radius: 6px;
  border: none;
  background: #6c47ff;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #4b2bbd;
  }
`; 