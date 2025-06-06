import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core.module';
import { ConfigProvider } from './domain/core/services/config-provider';
import { DocumentEntity } from './infrastructure/documents/persistance/typeorm/entities/document.entity';
import { AddressEntity } from './infrastructure/members/persistance/typeorm/entities/address.entity';
import { MembersRelationsEntity } from './infrastructure/members/persistance/typeorm/entities/member-relation.entity';
import { MemberEntity } from './infrastructure/members/persistance/typeorm/entities/member.entity';
import { SocialNetworkEntity } from './infrastructure/members/persistance/typeorm/entities/social-network.entity';
import { TokenEntity } from './infrastructure/users/persistance/typeorm/entities/token.entity';
import { UserEntity } from './infrastructure/users/persistance/typeorm/entities/user.entity';
import { EMailsTemplateEntity } from './infrastructure/emails/persistance/typeorm/entities/emails-template.entity';
import { AuthModule } from './auth.module';
import { EMailsModule } from './emails.module';
import { UsersModule } from './users.module';

@Module({
  imports: [
    CoreModule,
    TypeOrmModule.forRootAsync({
      imports: [CoreModule],
      inject: [ConfigProvider],
      useFactory: (configProvider: ConfigProvider) => ({
        type: configProvider.getString('DB_TYPE') as
          | 'mysql'
          | 'mariadb'
          | undefined,
        host: configProvider.getString('DB_HOST'),
        port: configProvider.getNumber('DB_PORT'),
        username: configProvider.getString('DB_USERNAME'),
        password: configProvider.getString('DB_PASSWORD'),
        database: configProvider.getString('DB_DATABASE_NAME'),
        entities: [
          DocumentEntity,
          EMailsTemplateEntity,
          AddressEntity,
          MemberEntity,
          MembersRelationsEntity,
          SocialNetworkEntity,
          TokenEntity,
          UserEntity,
        ],
        synchronize: configProvider.getString('DB_SYNCHRONIZE') === 'true', // true en dev, false en prod (utilisez les migrations)
      }),
    }),
    EMailsModule.forRoot(),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
