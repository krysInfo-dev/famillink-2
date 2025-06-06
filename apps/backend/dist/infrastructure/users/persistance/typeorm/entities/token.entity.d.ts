import { ETokenType } from 'src/domain/users/entities/enum-token-type';
import { UserEntity } from './user.entity';
export declare class TokenEntity {
    id: number;
    token: string;
    tokenType: ETokenType;
    expirationDatetime: Date;
    used: boolean;
    user: UserEntity | null;
}
