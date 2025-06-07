import {
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { AddressEntity } from './address.entity';
import { SocialNetworkEntity } from './social-network.entity';
import { DocumentEntity } from 'src/infrastructure/documents/persistance/typeorm/entities/document.entity';

@Entity('famillink_members')
@Index('idx_member_code', ['code'])
export class MemberEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  code!: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  firstName!: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lastName?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  nickName?: string;

  @Column({ type: 'date', nullable: true })
  birthDate?: Date;

  @Column({ type: 'date', nullable: true })
  deathDate?: Date;

  @OneToOne(() => AddressEntity, {
    cascade: ['insert', 'update', 'remove'],
    nullable: true,
    eager: true, // Load address data automatically when loading a member
  })
  @JoinColumn({ name: 'address_id' })
  address?: AddressEntity;

  @Column({ type: 'varchar', length: 30, nullable: true })
  phoneNumber?: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  mobileNumber?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  email?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  website?: string;

  @OneToMany(
    () => SocialNetworkEntity,
    (socialNetwork) => socialNetwork.member,
    { cascade: ['insert', 'update', 'remove'], nullable: true },
  )
  socialsNetworks?: SocialNetworkEntity[];

  @Column({ type: 'text', nullable: true })
  biography?: string;

  @OneToOne(() => DocumentEntity, {
    nullable: true,
    eager: true, // Load photo data automatically when loading a member
    onDelete: 'SET NULL', // If the document is deleted, set the photo reference to null
  })
  @JoinColumn({ name: 'photo_id' })
  photo?: DocumentEntity;
}
