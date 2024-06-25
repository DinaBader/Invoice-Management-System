"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keycloakAdmin = void 0;
exports.authenticateAdminClient = authenticateAdminClient;
const keycloak_admin_1 = require("keycloak-admin");
exports.keycloakAdmin = new keycloak_admin_1.default({
    baseUrl: 'http://localhost:8080',
    realmName: 'invoice-management-system',
});
async function authenticateAdminClient() {
    await exports.keycloakAdmin.auth({
        username: 'admin',
        password: 'dina',
        grantType: 'password',
        clientId: 'admin-cli',
    });
}
//# sourceMappingURL=keycloak-admin.config.js.map