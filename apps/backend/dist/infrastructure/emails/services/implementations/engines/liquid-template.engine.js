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
exports.LiquidTemplateEngine = void 0;
const common_1 = require("@nestjs/common");
const liquidjs_1 = require("liquidjs");
let LiquidTemplateEngine = class LiquidTemplateEngine {
    engine;
    constructor() {
        this.engine = new liquidjs_1.Liquid({
            strictVariables: true,
            strictFilters: true,
            cache: true,
        });
    }
    async render(template, data) {
        try {
            return await this.engine.parseAndRender(template, data);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new common_1.InternalServerErrorException(`Template rendering failed: ${errorMessage}`);
        }
    }
    async renderSubject(template, data) {
        return this.render(template, data);
    }
};
exports.LiquidTemplateEngine = LiquidTemplateEngine;
exports.LiquidTemplateEngine = LiquidTemplateEngine = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LiquidTemplateEngine);
//# sourceMappingURL=liquid-template.engine.js.map