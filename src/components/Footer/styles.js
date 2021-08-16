import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1 1;
  justify-content: space-between;
  align-items: center;
  grid-area: footer;
  padding-left: 10px;
  background: ${props => props.theme.colors.white};
  border-top: 1px solid ${props => props.theme.colors.hawkesBlue};
  p {
    color: ${props => props.theme.colors.vulcan};
  }

  @media screen and (max-height: 830px) {
    display: none;
  }
`;

