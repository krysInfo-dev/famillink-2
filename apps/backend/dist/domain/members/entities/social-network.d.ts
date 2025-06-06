import { ESocialNetworkType } from './enum-social-network-type';
import { Member } from './member';
export declare class SocialNetwork {
    id: number;
    member: Member;
    socialNetworkType: ESocialNetworkType;
    value: string;
}
