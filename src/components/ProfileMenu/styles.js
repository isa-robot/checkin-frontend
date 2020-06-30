import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

export const Badge = styled.div`
  position: relative;
  &:hover {
    cursor: pointer;
  }
`;

export const DropDown = styled.div`
  display: inline-block;
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  opacity: ${props => (props.visible ? 1 : 0)};
  transition: all 300ms linear;
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background-color: #ffffff;
  width: 15rem;
  z-index: 1;
  border: 0;
  box-shadow: 0px 10px 50px 0px rgba(0, 0, 0, 0.2);
  border-radius: 4px;

  button {
    text-align: initial;
    width: 100%;
    background-color: #fff;
    margin: 5px 0;
    border: 0;
    padding: 0.6rem;
    transition: all 150ms linear;
    font-size: 1rem;
    @media screen and (max-width: 767px) {
      font-size:1.3rem;
    }

    &:hover {
      background-color: ${props => props.theme.colors.whiteSmoke};
    }
  }
`;
