import { PaginationParameters } from 'src/domain/core/entities/pagination-parameters';
import { User } from 'src/domain/users/entities/user';

/**
 * Interface for the users domain repository.
 * Defines the contract for accessing and manipulating user data.
 */
export interface UsersDomainRepository {
  /**
   * Creates a new user.
   * @param {User} entity - The user entity to create.
   * @returns {Promise<number>} The ID of the created user.
   */
  create(entity: User): Promise<number>;

  /**
   * Reads all users.
   * @returns {Promise<User[]>} An array of all user entities.
   */
  readAll(): Promise<User[]>;

  /**
   * Reads a user by their ID.
   * @param {number} id - The ID of the user.
   * @returns {Promise<User | null>} The user entity or null if not found.
   */
  read(id: number): Promise<User | null>;

  /**
   * Updates a user.
   * @param {User | null} entity - The user entity to update.
   * @returns {Promise<void>}
   */
  update(entity: User | null): Promise<void>;

  /**
   * Deletes a user by their ID.
   * @param {number} id - The ID of the user to delete.
   * @returns {Promise<void>}
   */
  delete(id: number): Promise<void>;

  /**
   * Finds a user by their username and password.
   * @param {string} userName - The user's username.
   * @param {string} password - The user's password.
   * @returns {Promise<User | null>} The user entity or null if not found.
   */
  findByUserNameAndPassword(
    userName: string,
    password: string,
  ): Promise<User | null>;

  /**
   * Finds a user by their username.
   * @param {string} userName - The user's username.
   * @returns {Promise<User | null>} The user entity or null if not found.
   */
  findByUserName(userName: string): Promise<User | null>;

  /**
   * Finds users with pagination.
   * @param {PaginationParameters} paginationParams - The pagination parameters.
   * @returns {Promise<{ items: User[]; total: number }>} An object containing the items and total count.
   */
  findPaginated(
    paginationParams: PaginationParameters,
  ): Promise<{ items: User[]; total: number }>;
}
