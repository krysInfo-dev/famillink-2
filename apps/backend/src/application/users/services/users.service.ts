import { Inject, Injectable } from '@nestjs/common';
import { UsersDomainRepository } from 'src/domain/users/repositories/users-domain.repository';
import { BcryptService } from 'src/infrastructure/core/services/bcrypt.service';
import { User } from 'src/domain/users/entities/user';
import { USERS_DOMAIN_REPOSITORY } from 'src/domain/users/repositories/users.injection-token';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_DOMAIN_REPOSITORY)
    private readonly userRepository: UsersDomainRepository,
    private readonly bcryptService: BcryptService,
  ) {}

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

  async findByUserName(userName: string): Promise<User | null> {
    return await this.userRepository.findByUserName(userName);
  }

  async read(userId: number): Promise<User | null> {
    return await this.userRepository.read(userId);
  }

  async update(user: User | null): Promise<void> {
    if (user) {
      return await this.userRepository.update(user);
    }
  }
}
