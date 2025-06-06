"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseException = void 0;
const common_1 = require("@nestjs/common");
class BaseException extends common_1.HttpException {
    errorCode;
    constructor(message, statusCode, errorCode) {
        super({
            statusCode,
            message,
            errorCode,
            timestamp: new Date().toISOString(),
        }, statusCode);
        this.errorCode = errorCode;
    }
}
exports.BaseException = BaseException;
//# sourceMappingURL=base.exception.js.map