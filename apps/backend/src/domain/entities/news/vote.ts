import { Member } from '../members/member';

export class Vote {
  id!: number;
  author!: Member;
  value: number;
  voteDate!: Date;
}
