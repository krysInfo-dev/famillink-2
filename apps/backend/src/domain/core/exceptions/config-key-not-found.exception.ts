import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

/**
 * Exception thrown when a configuration key is not found.
 */
export class ConfigKeyNotFoundException extends BaseException {
  /**
   * @param {string} [message='Resource not found'] - The error message.
   * @param {string} [errorCode='INTERNAL_SERVER_ERROR'] - The error code.
   */
  constructor(
    message = 'Resource not found',
    errorCode = 'INTERNAL_SERVER_ERROR',
  ) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, errorCode);
  }
}
