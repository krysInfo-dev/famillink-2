import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/application/users/services/users.service';
import { LoginInformations } from 'src/domain/auth/entities/login-information';
import { LoginResult } from 'src/domain/auth/entities/login-result';

/**
 * Use case for handling user login.
 * This class is responsible for authenticating a user and generating a JWT token upon successful login.
 */
@Injectable()
export class LoginUseCase {
  /**
   * @param {UsersService} userService - The user service to find and validate users.
   * @param {JwtService} jwtService - The JWT service to sign tokens.
   */
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Executes the login process.
   * @param {LoginInformations} loginInfos - The user's login credentials (email and password).
   * @returns {Promise<LoginResult>} The login result, including user details and a JWT token.
   * @throws {UnauthorizedException} If the login credentials are invalid.
   */
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
