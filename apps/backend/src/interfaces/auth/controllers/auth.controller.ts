import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Public } from 'src/interfaces/core/decorators/public.decorator';
import { LoginInfoDto } from '../dtos/login-info.dto';
import { LoggedUserInfoDto } from '../dtos/logged-user-info.dto';
import { LogoutInfoDto } from '../dtos/logout-info.dto';
import { UseApiKey } from 'src/interfaces/core/decorators/useApiKey.decorator';
import { ForgetPasswordDto } from '../dtos/forget-password.dto';
import { VerifyResetPasswordTokenDto } from '../dtos/verify-reset-password.dto';
import { ResetPasswordDto } from '../dtos/reset-password.dto';
import { LoginUseCase } from 'src/application/auth/use-cases/login.usecase';
import { LogoutUseCase } from 'src/application/auth/use-cases/logout.usecase';
import { CreateRequestForPasswordResetUseCase } from 'src/application/auth/use-cases/create-request-for-password-reset.usecase';
import { VerifyResetPasswordTokenUseCase } from 'src/application/auth/use-cases/verify-reset-password-token.usecase';
import { UserDto } from 'src/interfaces/users/dtos/user.dto';
import { ResetPasswordUseCase } from 'src/application/auth/use-cases/reset-password.usecase';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly logoutUseCase: LogoutUseCase,
    private readonly createRequestForPasswordResetUseCase: CreateRequestForPasswordResetUseCase,
    private readonly verifyResetPasswordTokenUseCase: VerifyResetPasswordTokenUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({
    summary: 'User login',
    description:
      'Authenticates a user and returns user information with access token',
  })
  @ApiBody({ type: LoginInfoDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully authenticated',
    type: LoggedUserInfoDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
  })
  async login(@Body() loginInfo: LoginInfoDto): Promise<LoggedUserInfoDto> {
    return await this.loginUseCase.execute({
      email: loginInfo.username,
      password: loginInfo.password,
    });
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  @ApiOperation({
    summary: 'User logout',
    description: 'Logs out a user by invalidating their token',
  })
  @ApiBody({ type: LogoutInfoDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully logged out',
  })
  async logout(@Body() logoutInfo: LogoutInfoDto): Promise<void> {
    await this.logoutUseCase.execute(logoutInfo).then(() => undefined);
  }

  @UseApiKey()
  @HttpCode(HttpStatus.OK)
  @Post('forget-password')
  @ApiOperation({
    summary: 'Request password reset',
    description:
      "Initiates the password reset process by sending a reset link to the user's email",
  })
  @ApiBody({ type: ForgetPasswordDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password reset email sent',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  async forgetPassword(@Body() param: ForgetPasswordDto): Promise<void> {
    return await this.createRequestForPasswordResetUseCase
      .execute(param)
      .then(() => undefined);
  }

  @UseApiKey()
  @HttpCode(HttpStatus.OK)
  @Post('verify-reset-password-token')
  @ApiOperation({
    summary: 'Verify password reset token',
    description:
      'Verifies if a password reset token is valid and returns user information',
  })
  @ApiBody({ type: VerifyResetPasswordTokenDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Token is valid',
    type: UserDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid token',
  })
  async verifyResetPasswordToken(
    @Body() param: VerifyResetPasswordTokenDto,
  ): Promise<UserDto> {
    return await this.verifyResetPasswordTokenUseCase
      .execute(param)
      .then((user) => {
        if (user) {
          return UserDto.fromEntity(user);
        } else {
          throw new Error('Invalid token');
        }
      });
  }

  @UseApiKey()
  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  @ApiOperation({
    summary: 'Reset password',
    description: "Resets a user's password using a valid reset token",
  })
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password successfully reset',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid token or password',
  })
  async resetPassword(@Body() param: ResetPasswordDto): Promise<void> {
    return await this.resetPasswordUseCase.execute(param).then(() => undefined);
  }
}
