import { AddressEntity } from './address.entity';
import { SocialNetworkEntity } from './social-network.entity';
import { DocumentEntity } from 'src/infrastructure/documents/persistance/typeorm/entities/document.entity';
export declare class MemberEntity {
    id: number;
    code: string;
    firstName: string;
    lastName?: string;
    nickName?: string;
    birthDate?: Date;
    deathDate?: Date;
    address?: AddressEntity;
    phoneNumber?: string;
    mobileNumber?: string;
    email?: string;
    website?: string;
    socialsNetworks?: SocialNetworkEntity[];
    biography?: string;
    photo?: DocumentEntity;
}
