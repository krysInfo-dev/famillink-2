import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigProvider } from '../../../domain/core/services/config-provider';
import { ConfigKeyNotFoundException } from 'src/domain/core/exceptions';

/**
 * Default implementation of the ConfigProvider.
 * This class uses the NestJS ConfigService to retrieve configuration values.
 */
@Injectable()
export class DefaultConfigProvider implements ConfigProvider {
  private readonly logger = new Logger(DefaultConfigProvider.name);

  /**
   * @param {ConfigService} configService - The NestJS configuration service.
   */
  constructor(private readonly configService: ConfigService) {}

  /**
   * Gets a configuration value as a string.
   * @param {string} key - The configuration key.
   * @returns {string} The configuration value.
   * @throws {ConfigKeyNotFoundException} If the key is not found.
   */
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

  /**
   * Gets a configuration value as a number.
   * @param {string} key - The configuration key.
   * @returns {number} The configuration value.
   * @throws {ConfigKeyNotFoundException} If the key is not found.
   */
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
