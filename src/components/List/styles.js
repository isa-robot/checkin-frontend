import styled from 'styled-components';

export const BasicList = styled.ul`
  padding-right: 5px;
  display: flex;
  flex: 1 1;
  max-width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  padding-left: 5px;

  @media (max-width: 1025px) {
    flex-direction: column;
  }

  li {
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;

    @media (max-width: 1025px) {
      flex-direction: column;
    }

    div {
      padding-top: 5px;
      display: flex;
      align-items: center;
      width: 100%;
      svg {
        margin-right: 10px;
      }
    }
    p {
      color: ${props => props.theme.colors.textColor};
      font-weight: lighter;
    }
  }
`;
