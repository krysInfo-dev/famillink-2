import { Entity, Index, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('famillink_mails_templates')
@Index('idx_mails_template_name', ['name'])
export class EMailsTemplateEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  subject!: string;

  @Column({ type: 'text', nullable: false })
  content: string;
}
