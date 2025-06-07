import { Inject, Injectable } from '@nestjs/common';
import { ETokenType } from 'src/domain/users/entities/enum-token-type';
import { Token } from 'src/domain/users/entities/token';
import { User } from 'src/domain/users/entities/user';
import { TokensDomainRepository } from 'src/domain/users/repositories/tokens-domain.repository';
import { TOKENS_DOMAIN_REPOSITORY } from 'src/domain/users/repositories/tokens.injection-token';
import { UsersDomainRepository } from 'src/domain/users/repositories/users-domain.repository';
import { USERS_DOMAIN_REPOSITORY } from 'src/domain/users/repositories/users.injection-token';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TokensService {
  constructor(
    @Inject(USERS_DOMAIN_REPOSITORY)
    private readonly userRepository: UsersDomainRepository,
    @Inject(TOKENS_DOMAIN_REPOSITORY)
    private readonly tokenRepository: TokensDomainRepository,
  ) {}

  async createTokenForNewUser(
    userId: number,
    duration: number,
  ): Promise<string> {
    return this.createToken(userId, duration, ETokenType.Initialisation);
  }

  async createTokenForPasswordReset(
    userId: number,
    duration: number,
  ): Promise<string> {
    return this.createToken(userId, duration, ETokenType.Reset);
  }

  async isTokenValide(token: string): Promise<boolean> {
    const tokenEntity = await this.tokenRepository.readByToken(token);
    return (
      !!tokenEntity &&
      !!tokenEntity.expirationDatetime &&
      Date.now() < tokenEntity.expirationDatetime.getTime()
    );
  }

  async getUserForToken(token: string): Promise<User | null | undefined> {
    const tokenEntity = await this.tokenRepository.readByTokenWithUser(token);
    console.dir(tokenEntity);
    return tokenEntity?.user;
  }

  async getUserForTokenWhereUserIdIsUserIdIdAndTokenIsValid(
    token: string,
    userId: number,
  ): Promise<User | null | undefined> {
    return await this.tokenRepository
      .readByTokenWithUserWhereUserIdIsUserIdIdAndTokenIsValid(token, userId)
      .then((res) => res?.user);
  }

  async setTokenUsed(token: string): Promise<void> {
    const tokenEntity = await this.tokenRepository.readByToken(token);
    if (tokenEntity) {
      if (
        tokenEntity.tokenType === ETokenType.Initialisation ||
        tokenEntity.tokenType === ETokenType.Reset
      ) {
        tokenEntity.expirationDatetime = new Date();
      }
      tokenEntity.used = true;
      await this.tokenRepository.update(tokenEntity);
    }
  }

  async addUsedJwtToken(token: string, userId: number): Promise<void> {
    const tokenEntity = new Token();
    tokenEntity.user = await this.userRepository.read(userId);
    tokenEntity.token = token;
    tokenEntity.tokenType = ETokenType.JWT;
    tokenEntity.used = true;
    tokenEntity.expirationDatetime = new Date();
    await this.tokenRepository.create(tokenEntity);
  }

  async isJwtTokenUsed(token: string): Promise<boolean> {
    const tokenEntity = await this.tokenRepository.readByTokenAndType(
      token,
      ETokenType.JWT,
    );
    return tokenEntity ? tokenEntity.used : false;
  }

  private async createToken(
    userId: number,
    duration: number,
    type: ETokenType,
  ): Promise<string> {
    const tokenEntity = new Token();
    tokenEntity.user = await this.userRepository.read(userId);
    tokenEntity.token = uuidv4();
    tokenEntity.tokenType = type;
    tokenEntity.used = false;
    tokenEntity.expirationDatetime = this.createExpirationDate(duration);
    await this.tokenRepository.create(tokenEntity);
    return tokenEntity.token;
  }

  private createExpirationDate(duration: number): Date {
    const date = new Date();
    date.setTime(date.getTime() + duration);
    return date;
  }
}
