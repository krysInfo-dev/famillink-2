import { ApiProperty } from '@nestjs/swagger';
import { DocumentDto } from 'src/interfaces/documents/dtos/documents.dto';
import { Member } from 'src/domain/members/entities/member';
import { SocialNetworkDto } from './social-network.dto';
import { AddressDto } from './address.dto';

/**
 * @class MemberDto
 * @description DTO for a member.
 */
export class MemberDto {
  /**
   * The unique identifier of the member.
   * @type {number}
   */
  @ApiProperty({
    description: 'The unique identifier of the member',
    type: 'number',
  })
  id?: number;

  /**
   * The unique code of the member.
   * @type {string}
   */
  @ApiProperty({
    description: 'The unique code of the member',
    type: 'string',
  })
  code?: string;

  /**
   * The first name of the member.
   * @type {string}
   */
  @ApiProperty({
    description: 'The first name of the member',
    type: 'string',
  })
  firstName?: string;

  /**
   * The last name of the member.
   * @type {string}
   */
  @ApiProperty({
    description: 'The last name of the member',
    type: 'string',
  })
  lastName?: string;

  /**
   * The nickname of the member.
   * @type {string}
   */
  @ApiProperty({
    description: 'The nickname of the member',
    type: 'string',
  })
  nickName?: string;

  /**
   * The birth date of the member.
   * @type {Date}
   */
  @ApiProperty({
    description: 'The birth date of the member',
    type: 'string',
    format: 'date-time',
  })
  birthDate?: Date;

  /**
   * The death date of the member.
   * @type {Date}
   */
  @ApiProperty({
    description: 'The death date of the member',
    type: 'string',
    format: 'date-time',
  })
  deathDate?: Date;

  /**
   * The address of the member.
   * @type {AddressDto}
   */
  @ApiProperty({
    description: 'The address of the member',
    type: AddressDto,
  })
  address?: AddressDto;

  /**
   * The phone number of the member.
   * @type {string}
   */
  @ApiProperty({
    description: 'The phone number of the member',
    type: 'string',
  })
  phoneNumber?: string;

  /**
   * The mobile number of the member.
   * @type {string}
   */
  @ApiProperty({
    description: 'The mobile number of the member',
    type: 'string',
  })
  mobileNumber?: string;

  /**
   * The email of the member.
   * @type {string}
   */
  @ApiProperty({
    description: 'The email of the member',
    type: 'string',
  })
  email?: string;

  /**
   * The website of the member.
   * @type {string}
   */
  @ApiProperty({
    description: 'The website of the member',
    type: 'string',
  })
  website?: string;

  /**
   * The social networks of the member.
   * @type {SocialNetworkDto[]}
   */
  @ApiProperty({
    description: 'The social networks of the member',
    type: [SocialNetworkDto],
  })
  socialsNetworks?: SocialNetworkDto[];

  /**
   * The biography of the member.
   * @type {string}
   */
  @ApiProperty({
    description: 'The biography of the member',
    type: 'string',
  })
  biography?: string;

  /**
   * The profile picture of the member.
   * @type {DocumentDto}
   */
  @ApiProperty({
    description: 'The profile picture of the member',
    type: DocumentDto,
  })
  photo?: DocumentDto;

  /**
   * Creates a MemberDto from a Member entity.
   * @param {Member} entity - The member entity.
   * @returns {MemberDto} The created DTO.
   */
  static fromEntity(entity: Member): MemberDto {
    const dto = new MemberDto();
    dto.id = entity.id;
    dto.code = entity.code;
    dto.firstName = entity.firstName;
    dto.lastName = entity.lastName;
    dto.nickName = entity.nickName;
    dto.birthDate = entity.birthDate;
    dto.deathDate = entity.deathDate;
    dto.address = entity.address;
    dto.phoneNumber = entity.phoneNumber;
    dto.mobileNumber = entity.mobileNumber;
    dto.email = entity.email;
    dto.website = entity.website;
    dto.socialsNetworks = SocialNetworkDto.fromEntities(entity.socialsNetworks);
    dto.biography = entity.biography;
    if (entity.photo) {
      dto.photo = DocumentDto.fromEntity(entity.photo);
    }
    return dto;
  }

  /**
   * Creates a list of MemberDto from a list of Member entities.
   * @param {Member[]} entities - The list of member entities.
   * @returns {MemberDto[] | undefined} The created list of DTOs.
   */
  static fromEntities(entities: Member[] | undefined): MemberDto[] | undefined {
    if (!entities) {
      return undefined;
    }
    return entities.map((entity) => MemberDto.fromEntity(entity));
  }
}
