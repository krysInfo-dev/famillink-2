import { Inject, Injectable } from '@nestjs/common';
import { UsersDomainRepository } from 'src/domain/users/repositories/users-domain.repository';
import { BcryptService } from 'src/infrastructure/core/services/bcrypt.service';
import { User } from 'src/domain/users/entities/user';
import { USERS_DOMAIN_REPOSITORY } from 'src/domain/users/repositories/users.injection-token';

/**
 * Service for managing users.
 * This service provides methods for finding and managing users data.
 */
@Injectable()
export class UsersService {
  /**
   * @param {UsersDomainRepository} userRepository - The repository for users data.
   * @param {BcryptService} bcryptService - The service for password hashing and comparison.
   */
  constructor(
    @Inject(USERS_DOMAIN_REPOSITORY)
    private readonly userRepository: UsersDomainRepository,
    private readonly bcryptService: BcryptService,
  ) {}

  /**
   * Finds a users by their username and password.
   * @param {string} userName - The users's username.
   * @param {string} password - The users's password.
   * @returns {Promise<User | null>} The users object if the credentials are valid, otherwise null.
   */
  async findByUserNameAndPassword(
    userName: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userRepository.findByUserName(userName);
    if (
      user &&
      (await this.bcryptService.comparePasswordWithHash(
        password,
        user.password,
      ))
    ) {
      return user;
    }
    return null;
  }

  /**
   * Finds a users by their username.
   * @param {string} userName - The users's username.
   * @returns {Promise<User | null>} The users object, or null if not found.
   */
  async findByUserName(userName: string): Promise<User | null> {
    return await this.userRepository.findByUserName(userName);
  }

  /**
   * Reads a users by their ID.
   * @param {number} userId - The ID of the users.
   * @returns {Promise<User | null>} The users object, or null if not found.
   */
  async read(userId: number): Promise<User | null> {
    return await this.userRepository.read(userId);
  }

  /**
   * Updates a users's information.
   * @param {User | null} user - The users object with updated information.
   * @returns {Promise<void>}
   */
  async update(user: User | null): Promise<void> {
    if (user) {
      return await this.userRepository.update(user);
    }
  }
}
