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
exports.UsersPersistanceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const bcrypt_service_1 = require("../../../../core/services/bcrypt.service");
let UsersPersistanceService = class UsersPersistanceService {
    userRepository;
    bcryptService;
    constructor(userRepository, bcryptService) {
        this.userRepository = userRepository;
        this.bcryptService = bcryptService;
    }
    async create(entity) {
        entity.password = entity.password
            ? await this.bcryptService.hashPassword(entity.password)
            : entity.password;
        return await this.userRepository.save(entity).then((res) => res.id);
    }
    async readAll() {
        return this.userRepository.find();
    }
    async read(id) {
        return await this.userRepository.findOneBy({ id }).then((res) => res);
    }
    async update(entity) {
        if (entity) {
            entity.password = entity.password
                ? await this.bcryptService.hashPassword(entity.password)
                : entity.password;
            return await this.userRepository.save(entity).then(() => undefined);
        }
    }
    async delete(id) {
        return await this.userRepository.delete(id).then(() => undefined);
    }
    async findByUserNameAndPassword(userName, password) {
        const user = await this.userRepository.findOneBy({ userName });
        if (user &&
            (await this.bcryptService.comparePasswordWithHash(password, user.password))) {
            return user;
        }
        return null;
    }
    async findByUserName(userName) {
        return await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.member', 'member')
            .where('user.userName = :userName', { userName: userName })
            .getOne();
    }
    async findPaginated(paginationParams) {
        const { page, limit, sortBy, sortDirection, search } = paginationParams;
        const skip = ((page ?? 1) - 1) * (limit ?? 0);
        if (sortBy) {
            const order = {};
            order[sortBy] = sortDirection;
        }
        let query = this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.member', 'member');
        if (search) {
            query = query.where('(user.userName LIKE :search OR ' +
                'user.role LIKE :search OR ' +
                'user.causeOfInactivation LIKE :search OR ' +
                'user.inactivatedDate LIKE :search OR ' +
                'member.firstName LIKE :search OR ' +
                'member.lastName LIKE :search OR ' +
                'member.nickName LIKE :search OR ' +
                'member.birthDate LIKE :search OR ' +
                'member.deathDate LIKE :search)', { search: `%${search}%` });
        }
        query = query
            .orderBy(`user.${sortBy}`, sortDirection)
            .skip(skip)
            .take(limit);
        const [items, total] = await query.getManyAndCount();
        return { items: items, total };
    }
};
exports.UsersPersistanceService = UsersPersistanceService;
exports.UsersPersistanceService = UsersPersistanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        bcrypt_service_1.BcryptService])
], UsersPersistanceService);
//# sourceMappingURL=users-persistance.service.js.map