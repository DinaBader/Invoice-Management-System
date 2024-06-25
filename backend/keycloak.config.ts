import { KeycloakConnectOptions } from 'nest-keycloak-connect';

export const keycloakConfig: KeycloakConnectOptions = {
  authServerUrl: 'http://localhost:8080/auth',
  realm: 'invoice-management-system',
  clientId: 'users',
  secret: 'OrRuPikDIxLX3yXfVjRSW3Ugmx1U8TUq',
  bearerOnly: true,
  credentials: {
    secret: 'OrRuPikDIxLX3yXfVjRSW3Ugmx1U8TUq',
  },
};
