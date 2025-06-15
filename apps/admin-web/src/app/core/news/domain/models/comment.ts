import { Document } from '../../../documents/domain/models/document';
import { Member } from '../../../members/domain/models/member';
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
