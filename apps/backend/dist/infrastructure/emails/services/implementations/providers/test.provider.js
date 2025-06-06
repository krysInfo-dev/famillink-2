"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestProvider = void 0;
class TestProvider {
    async sendEmail(to, subject, content) {
        console.log(`Email to ${to}: ${subject}`);
        return Promise.resolve({ success: true, messageId: 'test-123', content });
    }
}
exports.TestProvider = TestProvider;
//# sourceMappingURL=test.provider.js.map