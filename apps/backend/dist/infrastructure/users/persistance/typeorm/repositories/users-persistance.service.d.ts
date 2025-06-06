import { UsersDomainRepository } from 'src/domain/users/repositories/users-domain.repository';
import { PaginationParamsDto } from 'src/interfaces/core/dtos/pagination-parameters.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { BcryptService } from 'src/infrastructure/core/services/bcrypt.service';
export declare class UsersPersistanceService implements UsersDomainRepository {
    private readonly userRepository;
    private readonly bcryptService;
    constructor(userRepository: Repository<UserEntity>, bcryptService: BcryptService);
    create(entity: UserEntity): Promise<number>;
    readAll(): Promise<UserEntity[]>;
    read(id: number): Promise<UserEntity | null>;
    update(entity: UserEntity | null): Promise<void>;
    delete(id: number): Promise<void>;
    findByUserNameAndPassword(userName: string, password: string): Promise<UserEntity | null>;
    findByUserName(userName: string): Promise<UserEntity | null>;
    findPaginated(paginationParams: PaginationParamsDto): Promise<{
        items: UserEntity[];
        total: number;
    }>;
}
