import { ESocialNetworkType } from 'src/domain/members/entities/enum-social-network-type';
import { MemberDto } from './member.dto';
import { SocialNetwork } from 'src/domain/members/entities/social-network';
export declare class SocialNetworkDto {
    id?: number;
    member: MemberDto;
    socialNetworkType: ESocialNetworkType;
    value: string;
    static fromEntity(entity: SocialNetwork): SocialNetworkDto;
    static fromEntities(entities: SocialNetwork[] | undefined): SocialNetworkDto[] | undefined;
}
