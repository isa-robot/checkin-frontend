import styled from 'styled-components';

export const Button = styled.button`
  background: ${props => props.theme.colors[props.backgroundColor]};
  color: ${props => props.theme.colors[props.color]} !important;
  border: none;
  width: ${props => props.width};
  height: ${props => props.height};
  padding: 0.75rem 1.2rem;
  transition: 0.5s;
  border-radius: 100px;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      color: #fff;
      margin-right: 0.5rem;
    }
  }
  &:hover {
    box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.2);
    transition-duration: 0.3s;
  }

  &:disabled {
    background: ${props => props.theme.colors.dimGray};
    &:hover {
      box-shadow: none;
      transition-duration: 0s;
    }
  }
`;
