import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersDomainRepository } from 'src/domain/users/repositories/users-domain.repository';
import { PaginationParamsDto } from 'src/interfaces/core/dtos/pagination-parameters.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { BcryptService } from 'src/infrastructure/core/services/bcrypt.service';

/**
 * TypeORM implementation of the users domain repository.
 * This service handles database operations for users using TypeORM.
 */
@Injectable()
export class UsersPersistanceService implements UsersDomainRepository {
  /**
   * @param {Repository<UserEntity>} userRepository - The TypeORM repository for users.
   * @param {BcryptService} bcryptService - The service for hashing passwords.
   */
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly bcryptService: BcryptService,
  ) {}

  /**
   * Creates a new users.
   * Hashes the password before saving.
   * @param {UserEntity} entity - The users entity to create.
   * @returns {Promise<number>} The ID of the created users.
   */
  async create(entity: UserEntity): Promise<number> {
    entity.password = entity.password
      ? await this.bcryptService.hashPassword(entity.password)
      : entity.password;
    return await this.userRepository.save(entity).then((res) => res.id);
  }

  /**
   * Reads all users.
   * @returns {Promise<UserEntity[]>} An array of all users entities.
   */
  async readAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  /**
   * Reads a users by their ID.
   * @param {number} id - The ID of the users.
   * @returns {Promise<UserEntity | null>} The users entity or null if not found.
   */
  async read(id: number): Promise<UserEntity | null> {
    return await this.userRepository.findOneBy({ id }).then((res) => res);
  }

  /**
   * Updates a users.
   * Hashes the password if it has been changed.
   * @param {UserEntity | null} entity - The users entity to update.
   * @returns {Promise<void>}
   */
  async update(entity: UserEntity | null): Promise<void> {
    if (entity) {
      entity.password = entity.password
        ? await this.bcryptService.hashPassword(entity.password)
        : entity.password;
      return await this.userRepository.save(entity).then(() => undefined);
    }
  }

  /**
   * Deletes a users by their ID.
   * @param {number} id - The ID of the users to delete.
   * @returns {Promise<void>}
   */
  async delete(id: number): Promise<void> {
    return await this.userRepository.delete(id).then(() => undefined);
  }

  /**
   * Finds a users by their username and password.
   * @param {string} userName - The users's username.
   * @param {string} password - The users's password.
   * @returns {Promise<UserEntity | null>} The users entity if the credentials are valid, otherwise null.
   */
  async findByUserNameAndPassword(
    userName: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.userRepository.findOneBy({ userName });
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
   * @returns {Promise<UserEntity | null>} The users entity or null if not found.
   */
  async findByUserName(userName: string): Promise<UserEntity | null> {
    return await this.userRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.member', 'member')
      .where('users.userName = :userName', { userName: userName })
      .getOne();
  }

  /**
   * Finds users with pagination.
   * @param {PaginationParamsDto} paginationParams - The pagination parameters.
   * @returns {Promise<{ items: UserEntity[]; total: number }>} An object containing the items and total count.
   */
  async findPaginated(
    paginationParams: PaginationParamsDto,
  ): Promise<{ items: UserEntity[]; total: number }> {
    const { page, limit, sortBy, sortDirection, search } = paginationParams;

    // Calculate the offset based on the page and limit
    const skip = ((page ?? 1) - 1) * (limit ?? 0);

    // Create the order object
    if (sortBy) {
      const order = {};
      order[sortBy] = sortDirection;
    }

    // Prepare the base query
    let query = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('users.member', 'member');

    // Add the search condition for unencrypted fields if a search term is provided
    if (search) {
      query = query.where(
        '(users.userName LIKE :search OR ' +
          'users.role LIKE :search OR ' +
          'users.causeOfInactivation LIKE :search OR ' +
          'users.inactivatedDate LIKE :search OR ' +
          'member.firstName LIKE :search OR ' +
          'member.lastName LIKE :search OR ' +
          'member.nickName LIKE :search OR ' +
          'member.birthDate LIKE :search OR ' +
          'member.deathDate LIKE :search)',
        { search: `%${search}%` },
      );
    }

    // Add order, skip, and limit
    query = query
      .orderBy(`user.${sortBy}`, sortDirection)
      .skip(skip)
      .take(limit);

    // Execute the query
    const [items, total] = await query.getManyAndCount();
    return { items: items, total };
  }
}
