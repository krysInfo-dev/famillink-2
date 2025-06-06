import { ETokenType } from './enum-token-type';
import { User } from './user';

export class Token {
  id!: number;
  token!: string;
  tokenType!: ETokenType;
  expirationDatetime!: Date;
  used!: boolean;
  user!: User | null;
}
