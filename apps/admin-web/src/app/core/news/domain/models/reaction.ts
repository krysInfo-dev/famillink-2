import { Member } from '../../../members/domain/models/member';
import { ReactionType } from './reaction-type';

export class Reaction {
  id!: number;
  author!: Member;
  reactionType!: ReactionType;
  reactionDate!: Date;
}
