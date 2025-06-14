import { PaginationParameters } from 'src/domain/core/entities/pagination-parameters';
import { User } from 'src/domain/users/entities/user';

/**
 * Interface for the users domain repository.
 * Defines the contract for accessing and manipulating users data.
 */
export interface UsersDomainRepository {
  /**
   * Creates a new users.
   * @param {User} entity - The users entity to create.
   * @returns {Promise<number>} The ID of the created users.
   */
  create(entity: User): Promise<number>;

  /**
   * Reads all users.
   * @returns {Promise<User[]>} An array of all users entities.
   */
  readAll(): Promise<User[]>;

  /**
   * Reads a users by their ID.
   * @param {number} id - The ID of the users.
   * @returns {Promise<User | null>} The users entity or null if not found.
   */
  read(id: number): Promise<User | null>;

  /**
   * Updates a users.
   * @param {User | null} entity - The users entity to update.
   * @returns {Promise<void>}
   */
  update(entity: User | null): Promise<void>;

  /**
   * Deletes a users by their ID.
   * @param {number} id - The ID of the users to delete.
   * @returns {Promise<void>}
   */
  delete(id: number): Promise<void>;

  /**
   * Finds a users by their username and password.
   * @param {string} userName - The users's username.
   * @param {string} password - The users's password.
   * @returns {Promise<User | null>} The users entity or null if not found.
   */
  findByUserNameAndPassword(
    userName: string,
    password: string,
  ): Promise<User | null>;

  /**
   * Finds a users by their username.
   * @param {string} userName - The users's username.
   * @returns {Promise<User | null>} The users entity or null if not found.
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
