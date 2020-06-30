import styled from 'styled-components';
import {
  Card as CardMaterial,
  CardHeader as CardHeaderMaterial,
} from '@material-ui/core';

export const Container = styled.div``;

export const Status = styled.p`
  color: ${props => props.color};
`;

export const ListSymptoms = styled.ul`
  li:not(:last-child)::after {
    content: "|";
    margin: 0.25em;
  }

  li{
    display: inline;
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

export const Chart = styled.div`
  width: 100%;
  height: 400px;
`;

export const Card = styled(CardMaterial)`
  margin-right: 10px;
  margin-bottom: 10px;
`;

export const TextTooltipChart = styled.p`
  color: ${props => props.color};
`;

export const ContentTooltipChart = styled.div`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.hawkesBlue};
  padding: 5px;
  border-radius: 5px;
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
