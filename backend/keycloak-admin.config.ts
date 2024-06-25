import KcAdminClient from 'keycloak-admin';

export const keycloakAdmin = new KcAdminClient({
  baseUrl: 'http://localhost:8080',
  realmName: 'invoice-management-system',
});

export async function authenticateAdminClient() {
  await keycloakAdmin.auth({
    username: 'admin',  
    password: 'dina',  
    grantType: 'password',
    clientId: 'admin-cli',
  });
}
