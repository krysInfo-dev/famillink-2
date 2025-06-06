import { DocumentDto } from 'src/interfaces/documents/dtos/documents.dto';
import { Member } from 'src/domain/members/entities/member';
import { SocialNetworkDto } from './social-network.dto';
import { AddressDto } from './address.dto';
export declare class MemberDto {
    id?: number;
    code?: string;
    firstName?: string;
    lastName?: string;
    nickName?: string;
    birthDate?: Date;
    deathDate?: Date;
    address?: AddressDto;
    phoneNumber?: string;
    mobileNumber?: string;
    email?: string;
    website?: string;
    socialsNetworks?: SocialNetworkDto[];
    biography?: string;
    photo?: DocumentDto;
    static fromEntity(entity: Member): MemberDto;
    static fromEntities(entities: Member[] | undefined): MemberDto[] | undefined;
}
