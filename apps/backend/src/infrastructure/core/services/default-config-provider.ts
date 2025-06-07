import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigProvider } from '../../../domain/core/services/config-provider';
import { ConfigKeyNotFoundException } from 'src/domain/core/exceptions';

@Injectable()
export class DefaultConfigProvider implements ConfigProvider {
  private readonly logger = new Logger(DefaultConfigProvider.name);

  constructor(private readonly configService: ConfigService) {}

  getString(key: string): string {
    const value = this.configService.get<string>(key);
    if (value === undefined) {
      this.logger.error(`Configuration key '${key}' not found`);
      throw new ConfigKeyNotFoundException(
        `Configuration key '${key}' not found`,
      );
    }
    this.logger.log(`Configuration key '${key}' found with value '${value}'`);
    return value;
  }

  getNumber(key: string): number {
    const value = this.configService.get<number>(key);
    if (value === undefined) {
      this.logger.error(`Configuration key '${key}' not found`);
      throw new ConfigKeyNotFoundException(
        `Configuration key '${key}' not found`,
      );
    }
    this.logger.log(`Configuration key '${key}' found with value '${value}'`);
    return value;
  }
}
