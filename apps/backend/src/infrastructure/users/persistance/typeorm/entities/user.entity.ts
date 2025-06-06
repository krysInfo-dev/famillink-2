import { ERole } from 'src/domain/users/entities/enum-role';
import { MemberEntity } from 'src/infrastructure/members/persistance/typeorm/entities/member.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('famillink_users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  userName!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password!: string;

  @Column({ type: 'enum', enum: ERole, default: ERole.User })
  role!: ERole;

  @Column({ type: 'boolean', nullable: false, default: false })
  inactivated!: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  causeOfInactivation?: string;

  @Column({ type: 'date', nullable: true })
  inactivatedDate?: Date;

  @OneToOne(() => MemberEntity, { nullable: true })
  @JoinColumn({ name: 'member_id' })
  @Index('idx_user_member_id')
  member?: MemberEntity;
}
