import styled from 'styled-components';
import {
  Card as CardMaterial,
  CardHeader as CardHeaderMaterial,
  CardActions as CardActionsMaterial,
  CardContent as CardContentMaterial,
} from '@material-ui/core';
import ButtonBase from '~/components/Buttons/Button';

export const Container = styled.div``;

export const CardActions = styled(CardActionsMaterial)`
  justify-content: flex-end;
`;

export const CardContent = styled(CardContentMaterial)``;

export const InputsGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    width: 50%;
  }

  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > div {
      width: 100%;
    }
  }
`;

export const InputGroup = styled.div`
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
    width: 90%;
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

    @media screen and (max-width: 361px) {
      max-width: 270px;
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

export const Card = styled(CardMaterial)`
  margin-right: 10px;
  margin-bottom: 10px;
`;

export const CardHeader = styled(CardHeaderMaterial)`
  .MuiCardHeader-title {
    font-family: 'Poppins';
  }

  .MuiCardHeader-subheader {
    font-family: 'Poppins';
  }
`;

export const Loading = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Button = styled(ButtonBase)`
  border-radius: 4px;
  margin-bottom: 10px;
  align-self: center;
  width: 7rem;
  @media screen and (max-width: 767px) {
    font-size: 1.3rem;
  }
`;
