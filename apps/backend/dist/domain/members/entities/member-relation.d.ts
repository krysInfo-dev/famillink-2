import { ERelationType } from './enum-relation-type';
import { Member } from './member';
export declare class MembersRelations {
    id: number;
    member1: Member;
    member2: Member;
    relationType: ERelationType;
    rank?: number | null;
}
