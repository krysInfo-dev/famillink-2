import { ETokenType } from 'src/domain/users/entities/enum-token-type';
import { Token } from 'src/domain/users/entities/token';

/**
 * Interface for the tokens domain repository.
 * Defines the contract for accessing and manipulating token data.
 */
export interface TokensDomainRepository {
  /**
   * Creates a new token.
   * @param {Token} entity - The token entity to create.
   * @returns {Promise<number>} The ID of the created token.
   */
  create(entity: Token): Promise<number>;

  /**
   * Reads a token by its ID.
   * @param {number} id - The ID of the token.
   * @returns {Promise<Token | null>} The token entity or null if not found.
   */
  read(id: number): Promise<Token | null>;

  /**
   * Reads a token by its token string.
   * @param {string} token - The token string.
   * @returns {Promise<Token | null>} The token entity or null if not found.
   */
  readByToken(token: string): Promise<Token | null>;

  /**
   * Reads a token by its token string and includes the associated users.
   * @param {string} token - The token string.
   * @returns {Promise<Token | null>} The token entity with the users, or null if not found.
   */
  readByTokenWithUser(token: string): Promise<Token | null>;

  /**
   * Reads a token by its token string and type.
   * @param {string} token - The token string.
   * @param {ETokenType} tokenType - The type of the token.
   * @returns {Promise<Token | null>} The token entity or null if not found.
   */
  readByTokenAndType(
    token: string,
    tokenType: ETokenType,
  ): Promise<Token | null>;

  /**
   * Reads a token by its string and users ID, and checks if it's valid.
   * @param {string} token - The token string.
   * @param {number} userId - The ID of the users.
   * @returns {Promise<Token | null>} The token entity with the users, or null if not found or invalid.
   */
  readByTokenWithUserWhereUserIdIsAndTokenIsValid(
    token: string,
    userId: number,
  ): Promise<Token | null>;

  /**
   * Updates a token.
   * @param {Token} entity - The token entity to update.
   * @returns {Promise<void>}
   */
  update(entity: Token): Promise<void>;

  /**
   * Deletes a token by its ID.
   * @param {number} id - The ID of the token to delete.
   * @returns {Promise<void>}
   */
  delete(id: number): Promise<void>;
}
