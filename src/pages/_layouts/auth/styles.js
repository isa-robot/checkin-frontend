import styled from 'styled-components';
import backgroundImg from '~/assets/images/background-signin.png';

export const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  min-height: 100%;

  background-image: url(${backgroundImg});
  /* Background image is centered vertically and horizontally at all times */
  background-position: center center;
  /* Background image doesn't tile */
  background-repeat: no-repeat;
  /* Background image is fixed in the viewport so that it doesn't move when
     the content's height is greater than the image's height */
  background-attachment: fixed;
  /* This is what makes the background image rescale based
     on the container's size */
  background-size: cover;
  /* Set a background color that will be displayed
     while the background image is loading */
  background-color: #${props => props.theme.colors.white};
`;
