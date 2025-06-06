import { User } from 'src/domain/users/entities/user';
import { TokensDomainRepository } from 'src/domain/users/repositories/tokens-domain.repository';
import { UsersDomainRepository } from 'src/domain/users/repositories/users-domain.repository';
export declare class TokensService {
    private readonly userRepository;
    private readonly tokenRepository;
    constructor(userRepository: UsersDomainRepository, tokenRepository: TokensDomainRepository);
    createTokenForNewUser(userId: number, duration: number): Promise<string>;
    createTokenForPasswordReset(userId: number, duration: number): Promise<string>;
    isTokenValide(token: string): Promise<boolean>;
    getUserForToken(token: string): Promise<User | null | undefined>;
    getUserForTokenWhereUserIdIsUserIdIdAndTokenIsValid(token: string, userId: number): Promise<User | null | undefined>;
    setTokenUsed(token: string): Promise<void>;
    addUsedJwtToken(token: string, userId: number): Promise<void>;
    isJwtTokenUsed(token: string): Promise<boolean>;
    private createToken;
    private createExpirationDate;
}
