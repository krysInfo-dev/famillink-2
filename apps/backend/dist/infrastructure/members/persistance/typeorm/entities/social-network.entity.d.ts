import { ESocialNetworkType } from 'src/domain/members/entities/enum-social-network-type';
import { MemberEntity } from './member.entity';
export declare class SocialNetworkEntity {
    id: number;
    member: MemberEntity;
    socialNetworkType: ESocialNetworkType;
    value: string;
}
