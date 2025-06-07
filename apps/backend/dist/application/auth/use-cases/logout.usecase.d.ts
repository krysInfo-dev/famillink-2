import { TokensService } from 'src/application/users/services/tokens.service';
import { LogoutInformations } from 'src/domain/auth/entities/logout-information';
export declare class LogoutUseCase {
    private readonly tokenEngine;
    constructor(tokenEngine: TokensService);
    execute(logoutInfos: LogoutInformations): Promise<void>;
}
