import styled from 'styled-components';
import backgroundImg from '~/assets/images/background-default_2.png';

export const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  min-height: 100%;

  background-image: url(${backgroundImg});
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: #${props => props.theme.colors.white};
`;

export const Layer = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 80px calc(100vh - 130px) 50px;
  grid-template-areas:
    'header'
    'content'
    'footer';

  @media screen and (max-height: 830px) {
    grid-template-rows: 80px calc(100vh - 80px);
    grid-template-areas:
      'header'
      'content';
  }
`;
