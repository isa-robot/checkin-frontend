import Keycloak from 'keycloak-js';

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'

export const keycloak = new Keycloak();

export const keycloakProviderInitConfig = {
  "realm": "isa-qualis",
  "auth-server-url": `${process.env.KEYCLOAK_SERVER_URL}/`,
  "ssl-required": "external",
  "resource": `${process.env.KEYCLOAK_CLIENT}`,
  "public-client": true,
  "verify-token-audience": true,
  "use-resource-role-mappings": true,
  "confidential-port": 0,
  onLoad: 'login-required',
  // onLoad: 'check-sso',
};

// export const onKeycloakEvent = (event, error) => {
// console.log('onKeycloakEvent', event, error);
// };

// export const onKeycloakTokens = tokens => {
// console.log('onKeycloakTokens', tokens);
// };
