"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
const member_dto_1 = require("../../members/dtos/member.dto");
class UserDto {
    id;
    userName;
    password;
    role;
    inactivated;
    causeOfInactivation;
    inactivationDate;
    member;
    static fromEntity(user) {
        const dto = new UserDto();
        dto.id = user.id;
        dto.userName = user.userName;
        dto.password = user.password;
        dto.role = user.role;
        dto.inactivated = user.inactivated;
        dto.causeOfInactivation = user.causeOfInactivation;
        dto.inactivationDate = user.inactivatedDate;
        if (user.member) {
            dto.member = member_dto_1.MemberDto.fromEntity(user.member);
        }
        return dto;
    }
}
exports.UserDto = UserDto;
//# sourceMappingURL=user.dto.js.map