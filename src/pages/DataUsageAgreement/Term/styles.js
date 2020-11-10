import styled from 'styled-components';
import Card from '~/components/Card';

export const MainCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1400px;
  max-height: 1400px;
  overflow-y: scroll;
  text-align: justify;
  ::-webkit-scrollbar {
    display: none;
  }
  margin: 0 auto;
  margin-top: 100px;
  padding: 0 2px 2px 2px;
  }
  @media screen and (max-height: 1000px) {
    justify-content: initial;
    margin-top: 5vh;
  }
`;


export const MainButtonGroup = styled.div`
  margin: 1.4rem 0px;
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
  flex: 1 1;
  text-align: center;
  max-height: 1000px;
  max-width: 1000px;
  padding: 3rem;
  margin-top: 100px;
  /*background: #77c90daa;*/

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

   divButton {
    display: flex;
    align-items: center;
  }

  span {
    font-size: 1.0rem;
  }

  button {
    width: 13rem
    height: 3rem
    color: white
    type: button
  }

  @media screen and (max-height: 830px) {
    margin-top: 5vh;
    padding: 1.5rem;
  }
`;

export const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

`;



