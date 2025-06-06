import { UsersDomainRepository } from 'src/domain/users/repositories/users-domain.repository';
import { BcryptService } from 'src/infrastructure/core/services/bcrypt.service';
import { User } from 'src/domain/users/entities/user';
export declare class UsersService {
    private readonly userRepository;
    private readonly bcryptService;
    constructor(userRepository: UsersDomainRepository, bcryptService: BcryptService);
    findByUserNameAndPassword(userName: string, password: string): Promise<User | null>;
    findByUserName(userName: string): Promise<User | null>;
    read(userId: number): Promise<User | null>;
    update(user: User | null): Promise<void>;
}
