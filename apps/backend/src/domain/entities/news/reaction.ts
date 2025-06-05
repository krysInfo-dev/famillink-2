import { Member } from '../members/member';
import { ReactionType } from './reaction-type';

export class Reaction {
  id!: number;
  author!: Member;
  reactionType: ReactionType;
  reactionDate!: Date;
}
