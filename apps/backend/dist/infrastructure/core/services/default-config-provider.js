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
var DefaultConfigProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultConfigProvider = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const exceptions_1 = require("../../../domain/core/exceptions");
let DefaultConfigProvider = DefaultConfigProvider_1 = class DefaultConfigProvider {
    configService;
    logger = new common_1.Logger(DefaultConfigProvider_1.name);
    constructor(configService) {
        this.configService = configService;
    }
    getString(key) {
        const value = this.configService.get(key);
        if (value === undefined) {
            this.logger.error(`Configuration key '${key}' not found`);
            throw new exceptions_1.ConfigKeyNotFoundException(`Configuration key '${key}' not found`);
        }
        this.logger.log(`Configuration key '${key}' found with value '${value}'`);
        return value;
    }
    getNumber(key) {
        const value = this.configService.get(key);
        if (value === undefined) {
            this.logger.error(`Configuration key '${key}' not found`);
            throw new exceptions_1.ConfigKeyNotFoundException(`Configuration key '${key}' not found`);
        }
        this.logger.log(`Configuration key '${key}' found with value '${value}'`);
        return value;
    }
};
exports.DefaultConfigProvider = DefaultConfigProvider;
exports.DefaultConfigProvider = DefaultConfigProvider = DefaultConfigProvider_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], DefaultConfigProvider);
//# sourceMappingURL=default-config-provider.js.map