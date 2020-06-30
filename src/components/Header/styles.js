import styled from 'styled-components';
import ListMaterial from '@material-ui/core/List';

export const List = styled(ListMaterial)`
  width: 250px;

  @media screen and (max-width: 767px) {
    p,
    a {
      font-size: 1.3rem;
    }
  }
`;

export const Container = styled.div`
  grid-area: header;
  display: flex;
  flex: 1 1;
  height: 100%;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px 0 5px;
  background: ${props => props.theme.colors.white};
  margin-bottom: 10px;
  border-bottom: 1px solid ${props => props.theme.colors.hawkesBlue};
  p,
  span,
  strong {
    color: ${props => props.theme.colors.vulcan};
  }
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoInfo = styled.div`
  display: flex;
  align-items: flex-end;
  font-family: 'Nunito', sans-serif;
  justify-content: center;

  p:first-child {
    font-weight: bold;
    font-size: 1.5rem;
    color: ${props => props.theme.colors.lightSeaGreen};
  }
  p:nth-child(2) {
    margin-left: 5px;
    padding-bottom: 2px;
    padding-right: 15px;
  }

  img {
    border-left: 1px solid ${props => props.theme.colors.hawkesBlue};
    padding-left: 15px;
    width: auto;
    height: 25px;
    filter: brightness(0.7);
  }

  @media (max-width: 767px) {
    display: none;
  }

  @media (max-width: 790px) {
    p:nth-child(2) {
      padding-bottom: 1px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.vulcan};
`;

export const ProfileData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  @media (max-width: 767px) {
    display: none;
  }
`;
