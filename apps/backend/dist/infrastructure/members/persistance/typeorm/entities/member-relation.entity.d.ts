import { ERelationType } from 'src/domain/members/entities/enum-relation-type';
import { MemberEntity } from './member.entity';
export declare class MembersRelationsEntity {
    id: number;
    member1: MemberEntity;
    member2: MemberEntity;
    relationType: ERelationType;
    rank?: number | null;
}
