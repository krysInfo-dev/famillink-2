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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_service_1 = require("../../../infrastructure/core/services/bcrypt.service");
const users_injection_token_1 = require("../../../domain/users/repositories/users.injection-token");
let UsersService = class UsersService {
    userRepository;
    bcryptService;
    constructor(userRepository, bcryptService) {
        this.userRepository = userRepository;
        this.bcryptService = bcryptService;
    }
    async findByUserNameAndPassword(userName, password) {
        const user = await this.userRepository.findByUserName(userName);
        if (user &&
            (await this.bcryptService.comparePasswordWithHash(password, user.password))) {
            return user;
        }
        return null;
    }
    async findByUserName(userName) {
        return await this.userRepository.findByUserName(userName);
    }
    async read(userId) {
        return await this.userRepository.read(userId);
    }
    async update(user) {
        if (user) {
            return await this.userRepository.update(user);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(users_injection_token_1.USERS_DOMAIN_REPOSITORY)),
    __metadata("design:paramtypes", [Object, bcrypt_service_1.BcryptService])
], UsersService);
//# sourceMappingURL=users.service.js.map