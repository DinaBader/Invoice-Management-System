"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let AuthService = class AuthService {
    async getToken() {
        if (!this.accessToken) {
            await this.fetchToken();
        }
        return this.accessToken;
    }
    async fetchToken() {
        const keycloakUrl = 'http://localhost:8080';
        const realm = 'invoice-management-system';
        const clientId = 'users';
        const clientSecret = 'OrRuPikDIxLX3yXfVjRSW3Ugmx1U8TUq';
        try {
            const response = await axios_1.default.post(`${keycloakUrl}/realms/${realm}/protocol/openid-connect/token`, new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: clientId,
                client_secret: clientSecret,
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            this.accessToken = response.data.access_token;
        }
        catch (error) {
            throw new Error('Failed to obtain Keycloak token: ' + error.message);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
//# sourceMappingURL=auth.service.js.map