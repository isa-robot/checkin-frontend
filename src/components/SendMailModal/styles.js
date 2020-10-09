import styled from 'styled-components';
import Card from '~/components/Card';

export const Container = styled.div`
  position: absolute;
  top: 0;
  display: ${props => (props.display === 'true' ? 'flex' : 'none')};
  flex: 1 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 100%;
  height: 100%;
  font-size: 16px !important;
  button {
    font-size: 16px !important;
  }
  background: rgba(0, 0, 0, 0.7);

  &:hover {
    cursor: pointer;
  }
`;

export const ModalCard = styled(Card)`
  display: flex;
  flex: 1 0;
  flex-direction: column;
  justify-content: space-between;
  max-height: 450px;
  max-width: 400px;
  height: 100%;
  padding: 20px;
  background: #fff;

  label,
  strong {
    color: ${props => props.theme.colors.vulcan};
  }

  span {
    color: ${props => props.theme.colors.dimGray};
    font-size: 14px;
  }

  strong {
    text-align: center;
  }

  &:hover {
    cursor: default;
  }
`;

export const ModalHeader = styled.div`
  min-height: 50px;
  text-align: center;
`;

export const ModalBody = styled.div`
  width: 100%;
  padding: 10px 0 0 15px;
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
  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  p {
    text-align: center;
    color: ${props => props.theme.colors.dimGray};
  }

  span {
    padding-left: 5px;
    color: ${props => props.theme.colors.sunset};
    font-size: 12px;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  min-height: 100px;

  div {
    flex-direction: row;
  }
`;

export const InputDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 60px;
  color: ${props => props.theme.colors.dimGrey};
  margin-bottom: 5px;

  &:hover {
    input {
      transition: border-bottom 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      border-bottom: 3px solid ${props => props.theme.colors.hawkesBlue};
    }
  }

  input {
    bottom: 0;
    position: absolute;
    width: 100%;
    max-width: 580px;
    height: 45px;
    border: none;
    border-bottom: 1px solid ${props => props.theme.colors.hawkesBlue};
    color: ${props => props.theme.colors.dimGray};
    padding-left: 10px;
    z-index: 1;
    background: rgba(0, 0, 0, 0);
    font-size: 16px !important;
    ::placeholder {
      opacity: 0;
    }

    :-ms-input-placeholder {
      opacity: 0;
    }

    ::-ms-input-placeholder {
      opacity: 0;
    }

    &:focus {
      border-bottom: 3px solid ${props => props.theme.colors.lightSeaGreen};
      transition: all 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    }
  }

  label {
    transition: all 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    font-size: 12px;
    color: ${props => props.theme.colors.lightSeaGreen};
  }

  input:not(:focus) + label {
    transform: translate(10px, 100%);
    font-size: 16px;
    transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    color: ${props => props.theme.colors.dimGray};
  }

  input:not(:placeholder-shown) + label {
    transform: translate(0, 0%);
    font-size: 12px;
    transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    color: ${props => props.theme.colors.lightSeaGreen};
  }
`;

export const SelectDiv = styled.div`
  display: flex;
  height: 60px;
  width: 100%;
  flex-direction: column;
  position: relative;

  color: ${props => props.theme.colors.dimGrey};
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
    background: rgba(0, 0, 0, 0);
    z-index: 1;
  }

  select:valid ~ label {
    transition: all 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    color: ${props => props.theme.colors.lightSeaGreen};
    font-size: 12px;
  }

  select:not(:valid) ~ label {
    transform: translate(10px, 100%);
    font-size: 16px;
    transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    color: ${props => props.theme.colors.dimGray};
  }
`;

export const ButtonDiv = styled.div`
  margin: 5px auto;
`;
