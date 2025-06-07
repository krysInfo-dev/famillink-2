import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/application/users/services/users.service';
import { LoginInformations } from 'src/domain/auth/entities/login-information';
import { LoginResult } from 'src/domain/auth/entities/login-result';
export declare class LoginUseCase {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    execute(loginInfos: LoginInformations): Promise<LoginResult>;
}
