import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class ConfigKeyNotFoundException extends BaseException {
  constructor(
    message = 'Resource not found',
    errorCode = 'INTERNAL_SERVER_ERROR',
  ) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, errorCode);
  }
}
