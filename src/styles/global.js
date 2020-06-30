import { createGlobalStyle } from 'styled-components';
// import Roboto from '~/assets/fonts/Roboto/Roboto-Regular.ttf';
// import RobotoBold from '~/assets/fonts/Roboto/Roboto-Bold.ttf';
// import RobotoLight from '~/assets/fonts/Roboto/Roboto-Light.ttf';
// import Poppins from '~/assets/fonts/Poppins/Poppins-Regular.ttf';
// import PoppinsBold from '~/assets/fonts/Poppins/Poppins-Bold.ttf';
// import PoppinsLight from '~/assets/fonts/Poppins/Poppins-Light.ttf';
// import PoppinsItalic from '~/assets/fonts/Poppins/Poppins-Italic.ttf';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }
  html, body, #root {
    height: 100%;
    min-height: 100%;
  }

  @media screen and (min-width: 250px) {
    html, button {
      font-size: calc(10px + 6 * ((100vw - 250px) / 680));
    }
  }

  @media screen and (min-width: 767px) {
    html, button {
      font-size: 16px;
    }
  }

  body {
    --webkit-font-smoothing: antialiased;
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance:textfield;
    }

  }

  body, input, select, button{
    font-family: 'Poppins' !important;
    color: ${props => props.theme.colors.white};

  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }
`;

/* @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: normal;
    font-display: swap;
    src: local('Poppins Regular'),
    local('Poppins-Regular'),
    url(${Poppins}) format('woff2');
  }
 @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: bold;
    font-display: swap;
    src: local('Poppins Bold'),
    local('Poppins-Bold'),
    url(${PoppinsBold}) format('woff2');
  }

  @font-face {
    font-family: 'Poppins';
    font-style: italic;
    font-weight: normal;
    font-display: swap;
    src: local('Poppins Italic'),
    local('Poppins-Italic'),
    url(${PoppinsItalic}) format('woff2');
  }

  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: lighter;
    font-display: swap;
    src: local('Poppins Light'),
    local('Roboto-Light'),
    url(${PoppinsLight}) format('woff2');
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: normal;
    font-display: swap;
    src: local('Roboto Regular'),
    local('Roboto-Regular'),
    url(${Roboto}) format('woff2');
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: bold;
    font-display: swap;
    src: local('Roboto Bold'),
    local('Roboto-Bold'),
    url(${RobotoBold}) format('woff2');
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: lighter;
    font-display: swap;
    src:
    local('Roboto Light'),
    local('Roboto-Light'),
    url(${RobotoLight}) format('woff2');
  } */
