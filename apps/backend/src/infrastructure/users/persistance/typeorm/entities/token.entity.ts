import { ETokenType } from 'src/domain/users/entities/enum-token-type';
import {
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('famillink_tokens')
@Index('idx_token_type', ['tokenType'])
export class TokenEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  token!: string;

  @Column({
    type: 'enum',
    enum: ETokenType,
    default: ETokenType.Initialisation,
  })
  tokenType!: ETokenType;

  @Column({ type: 'datetime', nullable: false })
  expirationDatetime!: Date;

  @Column({ type: 'boolean', nullable: false, default: false })
  used!: boolean;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  @Index('idx_token_user_id')
  user!: UserEntity | null;
}
