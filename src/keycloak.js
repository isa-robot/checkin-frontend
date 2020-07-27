import Keycloak from 'keycloak-js';

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'

export const keycloak = Keycloak({
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT,
  realm: process.env.REACT_APP_KEYCLOAK_REALM,
  url: process.env.REACT_APP_KEYCLOAK_SERVER_URL,
});

export const keycloakProviderInitConfig = {
  realm: process.env.REACT_APP_KEYCLOAK_REALM,
  'auth-server-url': process.env.REACT_APP_KEYCLOAK_SERVER_URL,
  'ssl-required': 'external',
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT,
  resource: process.env.REACT_APP_KEYCLOAK_CLIENT,
  'public-client': true,
  'verify-token-audience': true,
  'use-resource-role-mappings': true,
  'confidential-port': 0,
  onLoad: 'login-required',
};
