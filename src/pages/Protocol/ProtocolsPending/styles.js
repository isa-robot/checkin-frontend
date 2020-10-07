import styled from 'styled-components';
import Card from '~/components/Card';

export const Container = styled.div``;

export const Content = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 0 32px 32px 32px;
  max-width: 1400px;
  height: 100%;
  justify-content: center;
  @media screen and (max-width: 1400px) {
    margin: 0;
    justify-content: center;
  }
`;

export const Loading = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const MainCard = styled(Card)`
  display: ${props => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: space-around;
  max-width: 700px;
  max-height: 700px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  margin-top: 50px;
  padding: 1.5rem;
  p {
    font-size: 1.5rem;
  }
  h1 {
    font-size: 3rem;
  }
  > div {
    display: flex;
    flex-wrap: wrap;
    button {
      margin-right: 1.5rem;
    }
  }

  @media screen and (max-width: 1000px) {
    padding: 1.5rem;
    p {
      font-size: 1.3rem;
    }
    > div {
      button {
        margin-right: 1.5rem;
        &:first-child {
          margin-bottom: 1.3rem;
        }
      }
    }
  }

  @media screen and (max-height: 429px) {
    justify-content: initial;
  }

  @media screen and (max-height: 830px) {
    margin-top: 5vh;
  }
`;

export const FormCard = styled(Card)`
  display: ${props => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  color: #000;
  max-height: 800px;
  max-width: 600px;
  padding: 2rem;
  margin-top: 50px;
  font-weight: normal;
  min-width: 200px;
  p {
    font-size: 1rem;
    font-weight: normal;
  }
  h2 {
    font-size: 1.3rem;
  }
  h2, h3 {
    font-weight: normal;
    margin-bottom: 20px;
  }
  h3 {
    color: #544444;
    font-weight: 500;
    font-size: 1.2rem;
  }
  background: #fff;
  @media screen and (max-width: 1000px) {
    margin-top: 5vh;
    padding: 1.5rem;
    }
  }

  @media screen and (max-height: 830px) {
    margin-top: 5vh;
  }
`;

export const MainButtonGroup = styled.div`
  margin: 1.4rem 0px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
`;

export const FormButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1.4rem 0;
  button {
    margin-right: 1.5rem;

    margin-top: 1.5rem;
  }

  @media screen and (max-width: 767px) {
    button {
      margin-right: 0;
    }
    justify-content: space-around;
  }
`;

export const ChoiceGroup = styled.div`
  display: ${props => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  margin: 0 20px 20px 0;
  #newSymptom-text {
      border-radius: 5px;
      border: none;
      padding: 5px;
      box-shadow: 1px 1px 2px black;
      opacity: 1;
  }

  div {
    display: flex;
    align-items: center;
    > input {
      opacity: 1;
    }

    > label {
      padding-top: 5px;
    }

    > input + label {
      position: relative;
      padding-left: 35px;

      cursor: pointer;
      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 1px;
        width: 25px;
        height: 25px;
        border: 1px solid #aaa;
        background: none;
        border-radius: 3px;
      }
      &:after {
        content: '\f00c';
        font-family: FontAwesome;
        -webkit-text-fill-color: white;
        position: absolute;
        top: 5px;
        left: 5px;
        font-size: 20px;
      }
    }
    > input:not(:checked) + label {
      &:after {
        transform: scale(0);
      }
    }
  }
`;
