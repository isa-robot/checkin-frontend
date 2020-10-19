import styled from 'styled-components';
import Card from '~/components/Card';

export const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  flex: 1 1;
  text-align: center;
  max-height: 550px;
  max-width: 700px;
  padding: 3rem;
  margin-top: 100px;
  background: white;
  color: black;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    font-size: 2rem;
  }

  p {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }

  span {
    font-size: 1.3rem;
  }

  @media screen and (max-height: 830px) {
    margin-top: 5vh;
    padding: 1.5rem;
  }
`;
