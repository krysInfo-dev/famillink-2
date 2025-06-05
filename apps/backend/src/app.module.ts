import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Rend ConfigModule disponible globalement
      envFilePath: '.env', // Spécifie le chemin du fichier .env (vous devrez le créer)
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql', // Ou configService.get('DB_TYPE') si vous voulez le rendre configurable
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE_NAME'),
        entities: [__dirname + '/../**/*.entity.{js,ts}'], // Chemin vers vos entités
        synchronize: configService.get<string>('DB_SYNCHRONIZE') === 'true', // true en dev, false en prod (utilisez les migrations)
        // autoLoadEntities: true, // Alternative à 'entities' si vos entités sont bien structurées
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
