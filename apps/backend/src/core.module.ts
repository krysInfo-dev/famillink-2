import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DefaultConfigProvider } from './infrastructure/core/services/default-config-provider';
import { BcryptService } from './infrastructure/core/services/bcrypt.service';
import { ConfigProvider } from './domain/core/services/config-provider';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Rend ConfigModule disponible globalement
      envFilePath: '.env', // Spécifie le chemin du fichier .env (vous devrez le créer)
    }),
  ],
  providers: [
    {
      provide: ConfigProvider,
      useClass: DefaultConfigProvider,
    },
    BcryptService,
  ],
  exports: [ConfigProvider, BcryptService],
})
export class CoreModule {}
