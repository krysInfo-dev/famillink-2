import { ETokenType } from 'src/domain/users/entities/enum-token-type';
import { TokensDomainRepository } from 'src/domain/users/repositories/tokens-domain.repository';
import { Repository } from 'typeorm';
import { TokenEntity } from '../entities/token.entity';
export declare class TokensPersistanceService implements TokensDomainRepository {
    private readonly tokenRepository;
    constructor(tokenRepository: Repository<TokenEntity>);
    create(entity: TokenEntity): Promise<number>;
    read(id: number): Promise<TokenEntity | null>;
    readByToken(token: string): Promise<TokenEntity | null>;
    readByTokenWithUser(token: string): Promise<TokenEntity | null>;
    readByTokenAndType(token: string, tokenType: ETokenType): Promise<TokenEntity | null>;
    readByTokenWithUserWhereUserIdIsUserIdIdAndTokenIsValid(token: string, userId: number): Promise<TokenEntity | null>;
    update(entity: TokenEntity): Promise<void>;
    delete(id: number): Promise<void>;
}
