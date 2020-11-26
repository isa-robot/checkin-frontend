import styled from 'styled-components';
import Card from '~/components/Card';

export const MainCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: initial;
  max-width: 1400px;
  height: 1400px;
  margin-top: 15px;
  overflow-y: scroll;
  text-align: justify;
  background: #F0F8FF;
  border-radius: 5px;
   color: #000000;
  ::-webkit-scrollbar {
    display: none;
  }
  }
`;

export const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  @media(max-width: 500px) {
    flex-direction: column-reverse;
      button {
        width: 2px
        height: 2px
        color: white
        type: button
        margin-top: 5px;
        margin-bottom: 5px;
        border-radius: 25px;
      }
  }
  flex-direction: row;

    button {
    background: ${props => props.theme.colors[props.backgroundColor]};
    color: ${props => props.theme.colors[props.color]} !important;
    border: none;
    width: 150px;
    height: ${props => props.height};
    padding: 0.75rem 1.2rem;
    transition: 0.5s;
    border-radius: 100px;
    margin-left: 5px;
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
  }

  #voltar {
  background: #4B0082;
  }
  #naoAceito {
  background: #FF0000;
  }
  #aceito {
  background: #00FF7F;
  }
  #finalizar {
  background: #00FF7F;
  }

`;

export const Loading = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  max-height: 600px;
  max-width: 1300px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  background: #ffffff;
  span {
    font-size: 1.0rem;
  }
    h1 {
    font-size: 2.0rem;
    color: #000000;
  }
      h2 {
    font-size: 2.0rem;
    color: #000000;
  }
     span {
    font-size: 1.5rem;
    color: #000000;
  }
`;

export const FlexBox = styled.div`
  display: flex;
  margin: 50px auto;

  padding: 0 32px 32px 32px;
  max-width: 1400px;
  height: 90%;
  justify-content: center;
  @media(max-width: 500px) {
    margin-top: 10px;
    height: 550px
  }


`;



