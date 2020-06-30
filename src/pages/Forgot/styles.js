import styled from 'styled-components';
import { darken } from 'polished';
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
  background: ${props => props.theme.colors.white};
  box-shadow: 0px 0px 25px 3px rgba(0, 0, 0, 0.19);
  padding: 10px;
  text-align: center;
  justify-content: space-evenly;
  display: flex;
  flex-direction: column;
  max-width: 350px;

  p {
    color: ${props => props.theme.colors.vulcan};
    padding-top: 10px;
  }
  a {
    font-size: 12px;
    color: ${props => props.theme.colors.lightSeaGreen};
    &:visited {
      color: ${props => props.theme.colors.lightSeaGreen};
    }
    &:hover {
      color: ${props => darken(0.1, props.theme.colors.lightSeaGreen)};
    }
    &:active {
      color: ${props => props.theme.colors.lightSeaGreen};
    }
  }

  @media screen and (max-width: 361px) {
    max-width: 310px;
  }
  @media (max-width: 767px) {
    font-size: 1.2rem;
  }
`;

export const CardHeader = styled.div``;

export const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
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

export const LogoSecondary = styled.div`
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
      max-width: 270px;
    }
  }
  @media screen and (max-width: 361px) {
    width: 270px;
  }
`;

export const GreenButton = styled(Button)`
  border-radius: 4px;
  margin-bottom: 10px;
  min-height: 40px;
  width: 70%;
  align-self: center;
  font-size: 14px;
`;

export const LinkDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  flex-wrap: wrap;
`;
