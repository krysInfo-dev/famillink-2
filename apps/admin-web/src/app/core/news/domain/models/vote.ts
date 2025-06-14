import { Member } from '../../../members/domain/models/member';

export class Vote {
  id!: number;
  author!: Member;
  value = 0;
  voteDate!: Date;
}
