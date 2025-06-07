import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CreateRequestForPasswordResetUseCase } from './application/auth/use-cases/create-request-for-password-reset.usecase';
import { LoginUseCase } from './application/auth/use-cases/login.usecase';
import { LogoutUseCase } from './application/auth/use-cases/logout.usecase';
import { ResetPasswordUseCase } from './application/auth/use-cases/reset-password.usecase';
import { VerifyResetPasswordTokenUseCase } from './application/auth/use-cases/verify-reset-password-token.usecase';
import { VerifyTokenIsValidUseCase } from './application/auth/use-cases/verify-token-is-valid.usecase';
import { AuthGuard } from './interfaces/auth/guards/auth.guards';
import { RolesGuard } from './interfaces/auth/guards/roles.guard';
import { AuthController } from './interfaces/auth/controllers/auth.controller';
import { EMailsModule } from './emails.module';
import { CoreModule } from './core.module';
import { UsersModule } from './users.module';
import { ConfigProvider } from './domain/core/services/config-provider';

@Module({
  imports: [
    CoreModule,
    UsersModule,
    EMailsModule.forRoot(),
    JwtModule.registerAsync({
      imports: [CoreModule],
      inject: [ConfigProvider],
      useFactory: (configService: ConfigProvider) => ({
        secret: configService.getString('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.getString('JWT_EXPIRES_IN') || '1h',
        },
      }),
    }),
  ],
  providers: [
    CreateRequestForPasswordResetUseCase,
    LoginUseCase,
    LogoutUseCase,
    ResetPasswordUseCase,
    VerifyResetPasswordTokenUseCase,
    VerifyTokenIsValidUseCase,
    AuthGuard,
    RolesGuard,
  ],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
