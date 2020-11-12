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
    flex-direction: column;
        button {
          width: 2px
          eight: 2px
          color: white
          type: button
          margin-top: 5px;
          margin-bottom: 5px;
          border-radius: 25px;
        }
    }
  flex-direction: row;

    button {
    width: 13rem
    height: 3rem
    color: white
    type: button
    margin-left: 5px;
    margin-right: 5px;
    border-radius: 25px;
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
  height: 100%;
  justify-content: center;
`;



