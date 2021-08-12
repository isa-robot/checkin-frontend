import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { ptBR } from '@material-ui/core/locale';

import './config/configReactotron';
import 'react-datepicker/dist/react-datepicker.css';

import { KeycloakProvider } from '@react-keycloak/web';
import { keycloak, keycloakProviderInitConfig } from './keycloak';

import GlobalStyle from './styles/global';
import Routes from './routes';
import globalTheme from '~/styles/colors';
import MuiTheme from '~/styles/muiTheme';

import { store, persistor } from './store';

function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://selo.siteblindado.com/sslblindado.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  const theme = createMuiTheme(MuiTheme, ptBR);
  return (
    <KeycloakProvider keycloak={keycloak} onInit={keycloakProviderInitConfig}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <ThemeProvider theme={globalTheme}>
              <MuiThemeProvider theme={theme}>
                <Routes />
              </MuiThemeProvider>
              <GlobalStyle />
            </ThemeProvider>
            <ToastContainer autoClose={3000} />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </KeycloakProvider>
  );
}

export default App;
