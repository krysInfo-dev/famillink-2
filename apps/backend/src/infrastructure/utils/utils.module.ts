import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';

@Module({
  providers: [PasswordService],
  exports: [PasswordService], // Exporte PasswordService pour qu'il soit utilisable par d'autres modules
})
export class UtilsModule {}
