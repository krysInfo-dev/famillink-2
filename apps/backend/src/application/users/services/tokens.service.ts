import { Inject, Injectable, Logger } from '@nestjs/common';
import { ETokenType } from 'src/domain/users/entities/enum-token-type';
import { Token } from 'src/domain/users/entities/token';
import { User } from 'src/domain/users/entities/user';
import { TokensDomainRepository } from 'src/domain/users/repositories/tokens-domain.repository';
import { TOKENS_DOMAIN_REPOSITORY } from 'src/domain/users/repositories/tokens.injection-token';
import { UsersDomainRepository } from 'src/domain/users/repositories/users-domain.repository';
import { USERS_DOMAIN_REPOSITORY } from 'src/domain/users/repositories/users.injection-token';
import { v4 as uuidv4 } from 'uuid';

/**
 * Service for managing user tokens.
 * This service handles the creation, validation, and management of different types of tokens.
 */
@Injectable()
export class TokensService {
  private readonly logger = new Logger(TokensService.name);

  /**
   * @param {UsersDomainRepository} userRepository - The repository for user data.
   * @param {TokensDomainRepository} tokenRepository - The repository for token data.
   */
  constructor(
    @Inject(USERS_DOMAIN_REPOSITORY)
    private readonly userRepository: UsersDomainRepository,
    @Inject(TOKENS_DOMAIN_REPOSITORY)
    private readonly tokenRepository: TokensDomainRepository,
  ) {}

  /**
   * Creates a token for a new user.
   * @param {number} userId - The ID of the user.
   * @param {number} duration - The duration in milliseconds for which the token is valid.
   * @returns {Promise<string>} The generated token.
   */
  async createTokenForNewUser(
    userId: number,
    duration: number,
  ): Promise<string> {
    return this.createToken(userId, duration, ETokenType.Initialisation);
  }

  /**
   * Creates a token for password reset.
   * @param {number} userId - The ID of the user.
   * @param {number} duration - The duration in milliseconds for which the token is valid.
   * @returns {Promise<string>} The generated token.
   */
  async createTokenForPasswordReset(
    userId: number,
    duration: number,
  ): Promise<string> {
    return this.createToken(userId, duration, ETokenType.Reset);
  }

  /**
   * Checks if a token is valid (i.e., exists and has not expired).
   * @param {string} token - The token to validate.
   * @returns {Promise<boolean>} `true` if the token is valid, otherwise `false`.
   */
  async isTokenValide(token: string): Promise<boolean> {
    const tokenEntity = await this.tokenRepository.readByToken(token);
    return (
      !!tokenEntity &&
      !!tokenEntity.expirationDatetime &&
      Date.now() < tokenEntity.expirationDatetime.getTime()
    );
  }

  /**
   * Retrieves the user associated with a given token.
   * @param {string} token - The token.
   * @returns {Promise<User | null | undefined>} The user object, or null/undefined if not found.
   */
  async getUserForToken(token: string): Promise<User | null | undefined> {
    const tokenEntity = await this.tokenRepository.readByTokenWithUser(token);
    console.dir(tokenEntity);
    return tokenEntity?.user;
  }

  /**
   * Retrieves a user for a token if the token is valid and belongs to the specified user.
   * @param {string} token - The token.
   * @param {number} userId - The user's ID.
   * @returns {Promise<User | null | undefined>} The user object, or null/undefined if not found or invalid.
   */
  async getUserForTokenWhereUserIdIsAndTokenIsValid(
    token: string,
    userId: number,
  ): Promise<User | null | undefined> {
    this.logger.error('token: ' + token);
    this.logger.error('userId: ' + userId);
    const result = await this.tokenRepository
      .readByTokenWithUserWhereUserIdIsAndTokenIsValid(token, userId)
      .then((res) => res?.user);
    this.logger.error(result);
    return result;
  }

  /**
   * Marks a token as used.
   * For initialization or reset tokens, it also sets the expiration date to the current time.
   * @param {string} token - The token to mark as used.
   * @returns {Promise<void>}
   */
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

  /**
   * Adds a used JWT token to the repository.
   * This is used to invalidate JWTs upon logout.
   * @param {string} token - The JWT token.
   * @param {number} userId - The ID of the user.
   * @returns {Promise<void>}
   */
  async addUsedJwtToken(token: string, userId: number): Promise<void> {
    const tokenEntity = new Token();
    tokenEntity.user = await this.userRepository.read(userId);
    tokenEntity.token = token;
    tokenEntity.tokenType = ETokenType.JWT;
    tokenEntity.used = true;
    tokenEntity.expirationDatetime = new Date();
    await this.tokenRepository.create(tokenEntity);
  }

  /**
   * Checks if a JWT token has been marked as used.
   * @param {string} token - The JWT token.
   * @returns {Promise<boolean>} `true` if the token is used, otherwise `false`.
   */
  async isJwtTokenUsed(token: string): Promise<boolean> {
    const tokenEntity = await this.tokenRepository.readByTokenAndType(
      token,
      ETokenType.JWT,
    );
    return tokenEntity ? tokenEntity.used : false;
  }

  /**
   * Private method to create a token entity and save it to the repository.
   * @param {number} userId - The ID of the user.
   * @param {number} duration - The duration in milliseconds for which the token is valid.
   * @param {ETokenType} type - The type of the token.
   * @returns {Promise<string>} The generated token string.
   */
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

  /**
   * Creates an expiration date.
   * @param {number} duration - The duration in milliseconds from now.
   * @returns {Date} The calculated expiration date.
   */
  private createExpirationDate(duration: number): Date {
    const date = new Date();
    date.setTime(date.getTime() + duration);
    return date;
  }
}
