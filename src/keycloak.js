import Keycloak from 'keycloak-js';

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
export const keycloak = new Keycloak();

export const keycloakProviderInitConfig = {
  // onLoad: 'login-required',
  onLoad: 'check-sso',
};

// export const onKeycloakEvent = (event, error) => {
// console.log('onKeycloakEvent', event, error);
// };

// export const onKeycloakTokens = tokens => {
// console.log('onKeycloakTokens', tokens);
// };
