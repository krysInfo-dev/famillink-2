import { ESocialNetworkType } from 'src/domain/members/entities/enum-social-network-type';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { MemberEntity } from './member.entity';

@Entity('famillink_social_networks')
export class SocialNetworkEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => MemberEntity, (member) => member.socialsNetworks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'member_id' })
  member!: MemberEntity;

  @Column({
    type: 'enum',
    enum: ESocialNetworkType,
    default: ESocialNetworkType.Facebook,
  })
  socialNetworkType!: ESocialNetworkType;

  @Column({ type: 'varchar', length: 255, nullable: false })
  value!: string;
}
