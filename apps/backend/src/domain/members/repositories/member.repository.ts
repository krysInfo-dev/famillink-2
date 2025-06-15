import { ERelationType } from 'src/domain/members/entities/enum-relation-type';
import { Member } from 'src/domain/members/entities/member';
import { MembersRelations } from 'src/domain/members/entities/member-relation';
import { PaginationParameters } from 'src/domain/core/entities/pagination-parameters';

/**
 * Interface for the member repository.
 * Defines the contract for accessing and manipulating member data.
 */
export interface MemberRepository {
  /**
   * Creates a new member.
   * @param {Member} entity - The member entity to create.
   * @returns {Promise<number>} The ID of the created member.
   */
  create(entity: Member): Promise<number>;

  /**
   * Retrieves a member by ID.
   * @param {number} id - The ID of the member to retrieve.
   * @returns {Promise<Member | null>} The member entity or null if not found.
   */
  read(id: number): Promise<Member | null>;

  /**
   * Retrieves all members.
   * @returns {Promise<Member[]>} An array of all member entities.
   */
  readAll(): Promise<Member[]>;

  /**
   * Retrieves a member by code.
   * @param {string} code - The code of the member to retrieve.
   * @returns {Promise<Member>} The member entity.
   * @throws {NotFoundException} if the member is not found.
   */
  readByCode(code: string): Promise<Member>;

  /**
   * Retrieves a member by code if it exists.
   * @param {string} code - The code of the member to retrieve.
   * @returns {Promise<Member | null>} The member entity or null if not found.
   */
  readByCodeIfExist(code: string): Promise<Member | null>;

  /**
   * Updates a member.
   * @param {Member} entity - The member entity to update.
   * @returns {Promise<void>}
   */
  update(entity: Member): Promise<void>;

  /**
   * Deletes a member.
   * @param {number} id - The ID of the member to delete.
   * @returns {Promise<void>}
   */
  delete(id: number): Promise<void>;

  /**
   * Finds an existing relation between two members.
   * @param {number} member1Id - The ID of the first member.
   * @param {number} member2Id - The ID of the second member.
   * @param {ERelationType} relationType - The type of relation.
   * @returns {Promise<MembersRelations | null>} The relation entity or null if not found.
   */
  findExistingRelation(
    member1Id: number,
    member2Id: number,
    relationType: ERelationType,
  ): Promise<MembersRelations | null>;

  /**
   * Saves a relation between members.
   * @param {MembersRelations} entity - The relation entity to save.
   * @returns {Promise<number>} The ID of the saved relation.
   */
  saveRelation(entity: MembersRelations): Promise<number>;

  /**
   * Finds members with pagination.
   * @param {PaginationParameters} paginationParams - The pagination parameters.
   * @returns {Promise<{ items: Member[]; total: number }>} An object containing the items and total count.
   */
  findPaginated(
    paginationParams: PaginationParameters,
  ): Promise<{ items: Member[]; total: number }>;
}
