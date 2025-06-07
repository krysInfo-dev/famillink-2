"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigKeyNotFoundException = void 0;
const common_1 = require("@nestjs/common");
const base_exception_1 = require("./base.exception");
class ConfigKeyNotFoundException extends base_exception_1.BaseException {
    constructor(message = 'Resource not found', errorCode = 'INTERNAL_SERVER_ERROR') {
        super(message, common_1.HttpStatus.INTERNAL_SERVER_ERROR, errorCode);
    }
}
exports.ConfigKeyNotFoundException = ConfigKeyNotFoundException;
//# sourceMappingURL=config-key-not-found.exception.js.map