import { ERelationType } from 'src/domain/members/entities/enum-relation-type';
import { Member } from 'src/domain/members/entities/member';
import { MembersRelations } from 'src/domain/members/entities/member-relation';
import { PaginationParameters } from 'src/domain/core/entities/pagination-parameters';

export interface MemberRepository {
  /**
   * Creates a new member
   *
   * @param entity The member entity to create
   * @returns The ID of the created member
   */
  create(entity: Member): Promise<number>;

  /**
   * Retrieves a member by ID
   *
   * @param id The ID of the member to retrieve
   * @returns The member entity or null if not found
   */
  read(id: number): Promise<Member | null>;

  /**
   * Retrieves all members
   *
   * @returns Array of all member entities
   */
  readAll(): Promise<Member[]>;

  /**
   * Retrieves a member by code
   *
   * @param code The code of the member to retrieve
   * @returns The member entity
   * @throws NotFoundException if the member is not found
   */
  readByCode(code: string): Promise<Member>;

  /**
   * Retrieves a member by code if it exists
   *
   * @param code The code of the member to retrieve
   * @returns The member entity or null if not found
   */
  readByCodeIfExist(code: string): Promise<Member | null>;

  /**
   * Updates a member
   *
   * @param entity The member entity to update
   */
  update(entity: Member): Promise<void>;

  /**
   * Deletes a member
   *
   * @param id The ID of the member to delete
   */
  delete(id: number): Promise<void>;

  /**
   * Finds an existing relation between two members
   *
   * @param member1Id The ID of the first member
   * @param member2Id The ID of the second member
   * @param relationType The type of relation
   * @returns The relation entity or null if not found
   */
  findExistingRelation(
    member1Id: number,
    member2Id: number,
    relationType: ERelationType,
  ): Promise<MembersRelations | null>;

  /**
   * Saves a relation between members
   *
   * @param entity The relation entity to save
   * @returns The ID of the saved relation
   */
  saveRelation(entity: MembersRelations): Promise<number>;

  /**
   * Finds members with pagination
   *
   * @param paginationParams The pagination parameters
   * @returns Object containing the items and total count
   */
  findPaginated(
    paginationParams: PaginationParameters,
  ): Promise<{ items: Member[]; total: number }>;
}
