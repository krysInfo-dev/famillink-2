import 'reflect-metadata'; // DOIT être le premier import
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'Famillink', // Default is "Nest"
    }),
  });
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap(); // Gérer la promesse pour ESLint
