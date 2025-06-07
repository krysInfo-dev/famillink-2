import { ESocialNetworkType } from 'src/domain/members/entities/enum-social-network-type';
import { MemberDto } from './member.dto';
import { ApiProperty } from '@nestjs/swagger';
import { SocialNetwork } from 'src/domain/members/entities/social-network';

/**
 * @class SocialNetworkDto
 * @description DTO for a social network.
 */
export class SocialNetworkDto {
  /**
   * The unique identifier.
   * @type {number}
   */
  @ApiProperty({
    description: 'The unique identifier',
    type: 'number',
  })
  id?: number;

  /**
   * The member associated with this social network.
   * @type {MemberDto}
   */
  @ApiProperty({
    description: 'The member associated with this social network',
    type: () => MemberDto,
  })
  member: MemberDto;

  /**
   * The type of this social network.
   * @type {ESocialNetworkType}
   */
  @ApiProperty({
    description: 'The type of this social network',
    enum: ESocialNetworkType,
    enumName: 'ESocialNetworkType',
  })
  socialNetworkType: ESocialNetworkType;

  /**
   * The value of the social network.
   * @type {string}
   */
  @ApiProperty({
    description: 'The value of the social network',
    type: 'string',
  })
  value: string;

  /**
   * Creates a SocialNetworkDto from a SocialNetwork entity.
   * @param {SocialNetwork} entity - The social network entity.
   * @returns {SocialNetworkDto} The created DTO.
   */
  static fromEntity(entity: SocialNetwork): SocialNetworkDto {
    const dto = new SocialNetworkDto();
    dto.id = entity.id;
    dto.member = MemberDto.fromEntity(entity.member);
    dto.socialNetworkType = entity.socialNetworkType;
    dto.value = entity.value;
    return dto;
  }

  /**
   * Creates a list of SocialNetworkDto from a list of SocialNetwork entities.
   * @param {SocialNetwork[]} entities - The list of social network entities.
   * @returns {SocialNetworkDto[] | undefined} The created list of DTOs.
   */
  static fromEntities(
    entities: SocialNetwork[] | undefined,
  ): SocialNetworkDto[] | undefined {
    if (!entities) {
      return undefined;
    }
    return entities.map((entity) => SocialNetworkDto.fromEntity(entity));
  }
}
