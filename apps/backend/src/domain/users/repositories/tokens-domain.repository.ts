import { ETokenType } from 'src/domain/users/entities/enum-token-type';
import { Token } from 'src/domain/users/entities/token';

export interface TokensDomainRepository {
  create(entity: Token): Promise<number>;

  read(id: number): Promise<Token | null>;

  readByToken(token: string): Promise<Token | null>;

  readByTokenWithUser(token: string): Promise<Token | null>;

  readByTokenAndType(
    token: string,
    tokenType: ETokenType,
  ): Promise<Token | null>;

  readByTokenWithUserWhereUserIdIsUserIdIdAndTokenIsValid(
    token: string,
    userId: number,
  ): Promise<Token | null>;

  update(entity: Token): Promise<void>;

  delete(id: number): Promise<void>;
}
