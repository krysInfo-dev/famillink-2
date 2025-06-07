import { EMailData } from '../entities/email-data';
import { EMailResponse } from '../entities/email-response';

export interface EMailsSender {
  sendTemplatedEmail(data: EMailData): Promise<EMailResponse>;
}
