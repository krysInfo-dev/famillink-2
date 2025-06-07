import { Member } from '../../members/entities/member';
import { Comment } from './comment';
import { Reaction } from './reaction';
import { Vote } from './vote';
export declare class News {
    id: number;
    author: Member;
    title: string;
    content: string;
    documents: Document[];
    comments: Comment[];
    reactions: Reaction[];
    votes: Vote[];
    publicationDate: Date;
    updateDate?: Date;
}
