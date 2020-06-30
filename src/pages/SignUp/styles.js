import styled from 'styled-components';
import Button from '~/components/Buttons/Button';
import CardDefault from '~/components/Card';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  span {
    margin-bottom: 10px;
  }
`;

export const Card = styled(CardDefault)`
  display: flex;
  flex: 1;
  flex-direction: column;
  max-height: 600px;
  max-width: 350px;
  width: 100%;
  height: 100%;
  padding: 10px;
  text-align: center;
  background: ${props => props.theme.colors.white};
  box-shadow: 0px 0px 25px 3px rgba(0, 0, 0, 0.19);

  hr {
    margin-bottom: 5px;
  }

  span {
    color: ${props => props.theme.colors.dimGray};
  }

  a {
    max-width: 50px;
    color: ${props => props.theme.colors.dimGray};
    &:visited {
      color: ${props => props.theme.colors.dimGray};
    }
    &:hover {
      color: ${props => props.theme.colors.vulcan};
    }
    &:active {
      color: ${props => props.theme.colors.dimGray};
    }
  }

  @media screen and (max-width: 361px) {
    max-width: 310px;
  }
  @media screen and (max-height: 639px) {
    max-height: 500px;
  }

  @media (max-width: 767px) {
    font-size: 1.2rem;
  }
`;

export const CardHeader = styled.div``;

export const CardFooter = styled.div`
  display: flex;
  min-height: 100px;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

export const CardBody = styled.div`
  height: 350px;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.vulcan};
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.vulcan};
  }
  width: 100%;
  padding: 0 15px;
  span {
    padding-left: 5px;
    color: ${props => props.theme.colors.sunset};
    font-size: 12px;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bolder;
  padding: 5px 5px 0px 5px;
  font-family: 'Nunito';
  font-size: 3.5rem;
  p {
    color: ${props => props.theme.colors.lightSeaGreen};
  }
`;

export const LogoSecundary = styled.div`
  p {
    color: ${props => props.theme.colors.dimGray};
  }

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-weight: lighter;
  padding: 5px;
  justify-content: center;
  font-size: 1.2rem;
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 300px;
  max-width: 300px;
  position: relative;

  input {
    flex: 1 1;
    max-width: 300px;
    min-height: 50px;
    padding: 0.5rem 1rem 0.5rem 2.8rem;
    border: none;
    background-color: ${props => props.theme.colors.whiteSmoke};
    color: ${props => props.theme.colors.vulcan};
    border-radius: 4px;

    @media screen and (max-width: 361px) {
      max-width: 260px;
    }
  }
`;

export const GreenButton = styled(Button)`
  border-radius: 4px;
  width: 70%;
  min-height: 40px;
  align-self: center;
  color: #fff;
  min-height: 40px;
  font-size: 14px;
`;
