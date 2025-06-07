import { Module } from '@nestjs/common';
import { UsersService } from './application/users/services/users.service';
import { TokensService } from './application/users/services/tokens.service';
import { CoreModule } from './core.module';
import { TokensPersistanceService } from './infrastructure/users/persistance/typeorm/repositories/tokens-persistance.service';
import { UsersPersistanceService } from './infrastructure/users/persistance/typeorm/repositories/users-persistance.service';
import { TokenEntity } from './infrastructure/users/persistance/typeorm/entities/token.entity';
import { UserEntity } from './infrastructure/users/persistance/typeorm/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { USERS_DOMAIN_REPOSITORY } from './domain/users/repositories/users.injection-token';
import { TOKENS_DOMAIN_REPOSITORY } from './domain/users/repositories/tokens.injection-token';

@Module({
  imports: [CoreModule, TypeOrmModule.forFeature([UserEntity, TokenEntity])],
  providers: [
    {
      provide: USERS_DOMAIN_REPOSITORY,
      useClass: UsersPersistanceService,
    },
    {
      provide: TOKENS_DOMAIN_REPOSITORY,
      useClass: TokensPersistanceService,
    },
    UsersService,
    TokensService,
  ],
  controllers: [],
  exports: [UsersService, TokensService],
})
export class UsersModule {}
