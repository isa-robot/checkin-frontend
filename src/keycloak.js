import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak();

export const keycloakProviderInitConfig = {
  realm: 'isa-qualis',
  'auth-server-url': `${process.env.KEYCLOAK_SERVER_URL}/`,
  'ssl-required': 'external',
  resource: `${process.env.KEYCLOAK_CLIENT}`,
  'public-client': true,
  'verify-token-audience': true,
  'use-resource-role-mappings': true,
  'confidential-port': 0,
  onLoad: 'login-required'
}
