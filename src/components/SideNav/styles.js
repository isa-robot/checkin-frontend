import styled from 'styled-components';

export const Container = styled.div`
  grid-area: sidenav;
  max-width: 300px;

  @media (max-width: 992px) {
    display: none;
  }
`;

export const Menu = styled.div`
  display: flex;
  flex: 1 1;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  background: ${props => props.theme.colors.white};

  div {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    width: 100%;

    p {
      display: flex;
      justify-content: center;
      width: 80%;
      font-weight: bold;
      border-bottom: 1px solid ${props => props.theme.colors.hawkesBlue};
      padding-bottom: 15px;
    }
  }

  nav {
    padding: 20px 0 0 13px;
    width: 100%;

    li {
      margin-top: 10px;
      a {
        width: 100%;
        display: flex;
        align-items: center;
        color: ${props => props.theme.colors.sideNavTextColor};
        padding: 10px;
        font-size: 0.9rem;
        svg {
          margin-right: 10px;
        }
      }
    }
  }
`;
