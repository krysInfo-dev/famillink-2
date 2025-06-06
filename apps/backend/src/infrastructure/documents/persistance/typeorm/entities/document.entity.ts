import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('famillink_documents')
export class DocumentEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  documentType!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  documentUrl!: string;
}
