"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseApiKey = exports.IS_API_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.IS_API_KEY = 'isUseApiKey';
const UseApiKey = () => (0, common_1.SetMetadata)(exports.IS_API_KEY, true);
exports.UseApiKey = UseApiKey;
//# sourceMappingURL=useApiKey.decorator.js.map