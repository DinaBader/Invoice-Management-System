"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const typeorm_2 = require("typeorm");
const keycloak_admin_config_1 = require("../../keycloak-admin.config");
const auth_service_1 = require("../../authentication/auth.service");
let UserService = class UserService {
    constructor(userRepository, authService) {
        this.userRepository = userRepository;
        this.authService = authService;
    }
    async create(username, password, email, firstName, lastName) {
        try {
            const token = await this.authService.getToken();
            keycloak_admin_config_1.keycloakAdmin.setAccessToken(token);
            const userData = {
                "username": username,
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "enabled": true,
                "credentials": [
                    {
                        "type": "password",
                        "value": password,
                        "temporary": false
                    }
                ]
            };
            console.log("Creating user with data:", userData);
            await keycloak_admin_config_1.keycloakAdmin.users.create(userData);
            const newUser = this.userRepository.create({
                username,
                password,
                email,
                firstName,
                lastName,
            });
            await this.userRepository.save(newUser);
            return newUser;
        }
        catch (error) {
            console.error(`Failed to register user: ${error.message}`);
            console.error(`Error Response:`, error.response?.data);
            throw new Error("Failed to register user: " + error.message);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        auth_service_1.AuthService])
], UserService);
//# sourceMappingURL=user.service.js.map