import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/application/users/services/users.service';
import { LoginInformations } from 'src/domain/auth/entities/login-information';
import { LoginResult } from 'src/domain/auth/entities/login-result';

/**
 * Use case for handling users login.
 * This class is responsible for authenticating a users and generating a JWT token upon successful login.
 */
@Injectable()
export class LoginUseCase {
  private readonly logger = new Logger(LoginUseCase.name);

  /**
   * @param {UsersService} userService - The users service to find and validate users.
   * @param {JwtService} jwtService - The JWT service to sign tokens.
   */
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Executes the login process.
   * @param {LoginInformations} loginInfos - The users's login credentials (email and password).
   * @returns {Promise<LoginResult>} The login result, including users details and a JWT token.
   * @throws {UnauthorizedException} If the login credentials are invalid.
   */
  async execute(loginInfos: LoginInformations): Promise<LoginResult> {
    this.logger.log(`Entering Login for ${loginInfos.email}`);
    const user = await this.userService.findByUserNameAndPassword(
      loginInfos.email,
      loginInfos.password,
    );
    if (user === null || user === undefined) {
      this.logger.log(`Not found user for ${loginInfos.email}`);
      throw new UnauthorizedException();
    }
    this.logger.log(`Found user for ${loginInfos.email}`);
    this.logger.log(`Exit Login for ${loginInfos.email}`);
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
