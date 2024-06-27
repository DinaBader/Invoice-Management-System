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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const password_service_1 = require("../../services/password.service");
const user_service_1 = require("../User/user.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService, passwordService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.passwordService = passwordService;
    }
    async signIn(username, pass) {
        const user = await this.usersService.findOne(username);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const isPasswordValid = await this.passwordService.comparePasswords(pass, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid password');
        }
        const payload = { sub: user.id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
    async signUp(username, pass, firstName, lastName) {
        const existingUser = await this.usersService.findOne(username);
        if (existingUser) {
            throw new common_1.UnauthorizedException('Username already exists');
        }
        const hashedPassword = await this.passwordService.hashPassword(pass);
        const user = await this.usersService.createUser(username, hashedPassword, firstName, lastName);
        const payload = { sub: user.id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        password_service_1.PasswordService])
], AuthService);
//# sourceMappingURL=auth.service.js.map