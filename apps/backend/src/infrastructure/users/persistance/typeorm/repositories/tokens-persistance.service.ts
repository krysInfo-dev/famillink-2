import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ETokenType } from 'src/domain/users/entities/enum-token-type';
import { TokensDomainRepository } from 'src/domain/users/repositories/tokens-domain.repository';
import { Repository } from 'typeorm';
import { TokenEntity } from '../entities/token.entity';

/**
 * TypeORM implementation of the tokens domain repository.
 * This service handles database operations for tokens using TypeORM.
 */
@Injectable()
export class TokensPersistanceService implements TokensDomainRepository {
  /**
   * @param {Repository<TokenEntity>} tokenRepository - The TypeORM repository for tokens.
   */
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
  ) {}

  /**
   * Creates a new token.
   * @param {TokenEntity} entity - The token entity to create.
   * @returns {Promise<number>} The ID of the created token.
   */
  async create(entity: TokenEntity): Promise<number> {
    return await this.tokenRepository.save(entity).then((res) => res.id);
  }

  /**
   * Reads a token by its ID.
   * @param {number} id - The ID of the token.
   * @returns {Promise<TokenEntity | null>} The token entity or null if not found.
   */
  async read(id: number): Promise<TokenEntity | null> {
    return await this.tokenRepository.findOneBy({ id }).then((res) => res);
  }

  /**
   * Reads a token by its token string.
   * @param {string} token - The token string.
   * @returns {Promise<TokenEntity | null>} The token entity or null if not found.
   */
  async readByToken(token: string): Promise<TokenEntity | null> {
    return await this.tokenRepository.findOneBy({ token }).then((res) => res);
  }

  /**
   * Reads a token by its token string and includes the associated user.
   * @param {string} token - The token string.
   * @returns {Promise<TokenEntity | null>} The token entity with the user, or null if not found.
   */
  async readByTokenWithUser(token: string): Promise<TokenEntity | null> {
    return await this.tokenRepository
      .findOne({ where: { token: token }, relations: { user: true } })
      .then((res) => res);
  }

  /**
   * Reads a token by its token string and type.
   * @param {string} token - The token string.
   * @param {ETokenType} tokenType - The type of the token.
   * @returns {Promise<TokenEntity | null>} The token entity or null if not found.
   */
  async readByTokenAndType(
    token: string,
    tokenType: ETokenType,
  ): Promise<TokenEntity | null> {
    return await this.tokenRepository
      .findOneBy({ token, tokenType })
      .then((res) => res);
  }

  /**
   * Reads a token by its string and user ID, and checks if it's valid.
   * @param {string} token - The token string.
   * @param {number} userId - The ID of the user.
   * @returns {Promise<TokenEntity | null>} The token entity with the user, or null if not found or invalid.
   */
  async readByTokenWithUserWhereUserIdIsAndTokenIsValid(
    token: string,
    userId: number,
  ): Promise<TokenEntity | null> {
    return await this.tokenRepository
      .createQueryBuilder('token')
      .leftJoinAndSelect('token.user', 'user')
      .where('token.token = :token', { token: token })
      .andWhere('user.id = :userId', { userId: userId })
      .andWhere('token.expirationDatetime > :now', { now: new Date() })
      .getOne();
  }

  /**
   * Updates a token.
   * @param {TokenEntity} entity - The token entity to update.
   * @returns {Promise<void>}
   */
  async update(entity: TokenEntity): Promise<void> {
    return await this.tokenRepository.save(entity).then(() => undefined);
  }

  /**
   * Deletes a token by its ID.
   * @param {number} id - The ID of the token to delete.
   * @returns {Promise<void>}
   */
  async delete(id: number): Promise<void> {
    return await this.tokenRepository.delete(id).then(() => undefined);
  }
}
