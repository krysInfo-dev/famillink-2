import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { VerifyTokenIsValidUseCase } from 'src/application/auth/use-cases/verify-token-is-valid.usecase';
export declare class AuthGuard implements CanActivate {
    private readonly verifyTokenIsValidUseCase;
    private readonly jwtService;
    private readonly reflector;
    private readonly configService;
    constructor(verifyTokenIsValidUseCase: VerifyTokenIsValidUseCase, jwtService: JwtService, reflector: Reflector, configService: ConfigService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private isPublic;
    private isUseApiKey;
    private verifyApiKey;
    private verifyJwtToken;
    private extractTokenFromHeader;
}
