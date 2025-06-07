import { ERelationType } from 'src/domain/members/entities/enum-relation-type';
import { Member } from 'src/domain/members/entities/member';
import { MembersRelations } from 'src/domain/members/entities/member-relation';
import { PaginationParameters } from 'src/domain/core/entities/pagination-parameters';
export interface MemberRepository {
    create(entity: Member): Promise<number>;
    read(id: number): Promise<Member | null>;
    readAll(): Promise<Member[]>;
    readByCode(code: string): Promise<Member>;
    readByCodeIfExist(code: string): Promise<Member | null>;
    update(entity: Member): Promise<void>;
    delete(id: number): Promise<void>;
    findExistingRelation(member1Id: number, member2Id: number, relationType: ERelationType): Promise<MembersRelations | null>;
    saveRelation(entity: MembersRelations): Promise<number>;
    findPaginated(paginationParams: PaginationParameters): Promise<{
        items: Member[];
        total: number;
    }>;
}
