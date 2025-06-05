import { Address } from './address';
import { SocialNetwork } from './social-network';
import { Document } from '../document/document';

export class Member {
  id!: number;
  code!: string;
  firstName!: string;
  lastName?: string;
  nickName?: string;
  birthDate?: Date;
  deathDate?: Date;
  address?: Address;
  phoneNumber?: string;
  mobileNumber?: string;
  email?: string;
  website?: string;
  socialsNetworks?: SocialNetwork[];
  biography?: string;
  photo?: Document;
}
