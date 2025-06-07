import { PaginationParameters } from 'src/domain/core/entities/pagination-parameters';
import { User } from 'src/domain/users/entities/user';
export interface UsersDomainRepository {
    create(entity: User): Promise<number>;
    readAll(): Promise<User[]>;
    read(id: number): Promise<User | null>;
    update(entity: User | null): Promise<void>;
    delete(id: number): Promise<void>;
    findByUserNameAndPassword(userName: string, password: string): Promise<User | null>;
    findByUserName(userName: string): Promise<User | null>;
    findPaginated(paginationParams: PaginationParameters): Promise<{
        items: User[];
        total: number;
    }>;
}
