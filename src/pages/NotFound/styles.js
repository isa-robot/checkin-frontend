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
  background: ${props => props.theme.colors.white};
  box-shadow: 0px 0px 25px 3px rgba(0, 0, 0, 0.19);
  padding: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  h1 {
    color: ${props => props.theme.colors.vulcan};
    padding: 15px 0px 0px 0px;
  }
  span,
  h3 {
    color: ${props => props.theme.colors.dimGray};
    padding: 15px 0px 0px 0px;
  }
  a {
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
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bolder;
  padding: 5px 5px 15px 5px;
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

export const SignInForm = styled.form`
  display: flex;
  max-width: 530px;
  flex-direction: column;
  padding-left: 15px;
  padding-right: 15px;

  span {
    color: ${props => props.theme.colors.sunset};
    margin-left: 15px;
    margin-top: 5px;
    align-self: flex-start;
  }
`;

export const ImgContainer = styled.div`
  img {
    width: 100%;
    height: auto;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 300px;
  max-width: 300px;

  input {
    flex: 1 1;
    max-width: 300px;
    min-height: 50px;
    padding: 0.5rem 1rem 0.5rem 2.5rem;
    border: none;
    background-color: ${props => props.theme.colors.whiteSmoke};
    color: ${props => props.theme.colors.vulcan};
    border-radius: 4px;
    font-size: 1rem;

    @media screen and (max-width: 361px) {
      max-width: 270px;
    }
  }
`;

export const GreenButton = styled(Button)`
  height: 50px;
  margin-top: 40px;
  margin-bottom: 10px;
  border-radius: 4px;
  width: 70%;
  align-self: center;
  color: #fff;
`;
