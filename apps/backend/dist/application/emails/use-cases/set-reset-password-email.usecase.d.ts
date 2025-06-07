import { ConfigProvider } from 'src/domain/core/services/config-provider';
import { EMailsSender } from 'src/domain/emails/services/emails-sender';
import { User } from 'src/domain/users/entities/user';
export declare class SetResetPasswordEmailUseCase {
    private readonly emailsSender;
    private readonly configProvider;
    constructor(emailsSender: EMailsSender, configProvider: ConfigProvider);
    execute(token: string, user: User): Promise<void>;
}
