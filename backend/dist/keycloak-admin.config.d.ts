import KcAdminClient from 'keycloak-admin';
export declare const keycloakAdmin: KcAdminClient;
export declare function authenticateAdminClient(): Promise<void>;
