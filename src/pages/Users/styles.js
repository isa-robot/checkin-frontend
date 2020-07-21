import styled from 'styled-components';
import {
  Card as CardMaterial,
  CardHeader as CardHeaderMaterial,
} from '@material-ui/core';

import Card from '~/components/Card';

export const Container = styled.div``;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 0 32px 32px 32px;
  max-width: 1400px;
  height: 100%;


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
  max-height: 500px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  margin-top: 100px;
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
  max-height: 500px;
  max-width: 700px;
  min-width: 500px;
  padding: 2rem;
  margin-top: 100px;

  p {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }

  @media screen and (max-width: 1000px) {
    margin-top: 5vh;
    padding: 1.5rem;

    p {
      text-align: center;
    }
  }

  @media screen and (max-height: 830px) {
    margin-top: 5vh;
  }
`;

export const MainButtonGroup = styled.div`
  margin: 1.4rem 0px;
  display: flex;
  justify-content: center;
`;

export const SymptomGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  @media screen and (max-width: 767px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
    grid-row-gap: 2rem;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  @media screen and (max-width: 767px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
    grid-row-gap: 2rem;
  }
`;

export const FormButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1.4rem 0;
  justify-content: center;
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 20px 20px 0;

  @media screen and (max-width: 767px) {
    align-items: center;
    text-align: center;
    margin: 0;
    strong {
      font-size: 1.3rem;
    }
  }

  div {
    display: flex;
    @media screen and (max-width: 767px) {
      flex-direction: column;
    }

    > input {
      opacity: 0;
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

export const Symptom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 40%;
  margin: 0 20px 20px 0;

  label {
    position: relative;
    padding-left: 35px;
  }

  @media screen and (max-width: 767px) {
    align-items: center;
    width: 100%;
    text-align: center;
    margin: 0;
    strong {
      font-size: 1.3rem;
    }
  }
`;

export const CardHeader = styled(CardHeaderMaterial)`
  .MuiCardHeader-title {
    font-family: 'Poppins';
  }

  .MuiCardHeader-subheader {
    font-family: 'Poppins';
  }
`;

export const MyCard = styled(CardMaterial)`
  margin-right: 10px;
  margin-bottom: 10px;
`;

export const Scroll = styled.div`
  padding: 10px 0px 0px 10px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.vulcan};
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.vulcan};
  }

  width: 100%;
  height: 100%;
`;

export const SelectDiv = styled.div`
  display: flex;
  height: 60px;
  width: 100%;
  flex-direction: column;
  position: relative;

  margin-bottom: 5px;

  &:hover {
    select {
      transition: border-bottom 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      border-bottom: 3px solid ${props => props.theme.colors.hawkesBlue};
    }
  }

  select {
    bottom: 0;
    position: absolute;
    width: 100%;
    max-width: 580px;
    height: 45px;
    border: none;
    border-bottom: 1px solid ${props => props.theme.colors.hawkesBlue};
    color: ${props => props.theme.colors.dimGray};
    border-radius: 4px;
    padding-left: 5px;
    font-size: 16px !important;
    background: white;
    z-index: 1;
  }

  select:valid ~ label {
    transition: all 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    color: ${props => props.theme.colors.dimGray};
    font-size: 12px;
  }

  select:not(:valid) ~ label {
    transform: translate(10px, 100%);
    font-size: 16px;
    transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    color: ${props => props.theme.colors.dimGray};

    @media (max-width: 359px) {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 210px;
    }
  }
`;
