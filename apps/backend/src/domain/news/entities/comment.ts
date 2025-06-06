import { Document } from '../../documents/entities/document';
import { Member } from '../../members/entities/member';
import { Reaction } from './reaction';
import { Vote } from './vote';

export class Comment {
  id!: number;
  author!: Member;
  content!: string;
  documents!: Document[];
  comments!: Comment[];
  reactions!: Reaction[];
  votes!: Vote[];
  publicationDate!: Date;
  updateDate?: Date;
}
