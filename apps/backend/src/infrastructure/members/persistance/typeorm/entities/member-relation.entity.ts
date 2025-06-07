import { ERelationType } from 'src/domain/members/entities/enum-relation-type';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { MemberEntity } from './member.entity';

@Entity('famillink_members_relations')
export class MembersRelationsEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => MemberEntity)
  @JoinColumn({ name: 'member_1_id' })
  member1!: MemberEntity;

  @ManyToOne(() => MemberEntity)
  @JoinColumn({ name: 'member_2_id' })
  member2!: MemberEntity;

  @Column({
    type: 'enum',
    enum: ERelationType,
    default: ERelationType.Children,
  })
  relationType!: ERelationType;

  @Column({ type: 'int', nullable: true })
  rank?: number | null;
}
