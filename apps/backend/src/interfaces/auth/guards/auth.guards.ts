import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/interfaces/core/decorators/public.decorator';
import { IS_API_KEY } from 'src/interfaces/core/decorators/useApiKey.decorator';
import { VerifyTokenIsValidUseCase } from 'src/application/auth/use-cases/verify-token-is-valid.usecase';

/**
 * A guard that protects routes by checking for a valid JWT token or API key.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  /**
   * @param {VerifyTokenIsValidUseCase} verifyTokenIsValidUseCase - Use case to verify if a token is valid.
   * @param {JwtService} jwtService - The JWT service to verify tokens.
   * @param {Reflector} reflector - The reflector to access metadata.
   * @param {ConfigService} configService - The configuration service.
   */
  constructor(
    private readonly verifyTokenIsValidUseCase: VerifyTokenIsValidUseCase,
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Determines if a route can be activated.
   * @param {ExecutionContext} context - The execution context.
   * @returns {Promise<boolean>} `true` if the route can be activated, otherwise `false`.
   */
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.isPublic(context)) {
      return true;
    }
    if (this.isUseApiKey(context)) {
      return this.verifyApiKey(context);
    }
    return this.verifyJwtToken(context);
  }

  /**
   * Checks if a route is marked as public.
   * @param {ExecutionContext} context - The execution context.
   * @returns {boolean} `true` if the route is public, otherwise `false`.
   */
  private isPublic(context: ExecutionContext): boolean {
    return this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  /**
   * Checks if a route requires an API key.
   * @param {ExecutionContext} context - The execution context.
   * @returns {boolean} `true` if the route requires an API key, otherwise `false`.
   */
  private isUseApiKey(context: ExecutionContext): boolean {
    return this.reflector.getAllAndOverride<boolean>(IS_API_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  /**
   * Verifies the API key from the request header.
   * @param {ExecutionContext} context - The execution context.
   * @returns {boolean} `true` if the API key is valid.
   * @throws {UnauthorizedException} If the API key is missing or invalid.
   */
  private verifyApiKey(context: ExecutionContext) {
    const apiKey = this.configService.get<string>('INTERNAL_API_KEY');
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    return apiKey === token;
  }

  /**
   * Verifies the JWT token from the request header.
   * @param {ExecutionContext} context - The execution context.
   * @returns {Promise<boolean>} `true` if the JWT token is valid.
   * @throws {UnauthorizedException} If the token is missing or invalid.
   */
  private async verifyJwtToken(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    if (!(await this.verifyTokenIsValidUseCase.execute(token))) {
      console.log('token invalid');
      throw new UnauthorizedException();
    }
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      request['users'] = await this.jwtService.verifyAsync(token);
    } catch {
      console.log('token invalid 2');
      throw new UnauthorizedException();
    }
    return true;
  }

  /**
   * Extracts the token from the Authorization header.
   * @param {Request} request - The Express request object.
   * @returns {string | undefined} The token, or undefined if not found.
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
