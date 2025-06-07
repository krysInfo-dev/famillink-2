import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/application/users/services/users.service';
import { LoginInformations } from 'src/domain/auth/entities/login-information';
import { LoginResult } from 'src/domain/auth/entities/login-result';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(loginInfos: LoginInformations): Promise<LoginResult> {
    const user = await this.userService.findByUserNameAndPassword(
      loginInfos.email,
      loginInfos.password,
    );
    if (user === null || user === undefined) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.userName, role: user.role };
    return {
      id: user.id,
      username: user.userName,
      fullName: user.member
        ? user.member.firstName + ' ' + user.member.lastName
        : user.userName,
      role: user.role,
      memberId: user.member?.id,
      token: await this.jwtService.signAsync(payload),
    };
  }
}
