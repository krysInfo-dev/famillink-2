import { Member } from '../../members/entities/member';
export declare class Vote {
    id: number;
    author: Member;
    value: number;
    voteDate: Date;
}
