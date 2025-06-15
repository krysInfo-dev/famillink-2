import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Base class for custom exceptions.
 * It extends HttpException and adds a custom error code.
 */
export class BaseException extends HttpException {
  /**
   * @param {string} message - The error message.
   * @param {HttpStatus} statusCode - The HTTP status code.
   * @param {string} [errorCode] - A custom error code.
   */
  constructor(
    message: string,
    statusCode: HttpStatus,
    public readonly errorCode?: string,
  ) {
    super(
      {
        statusCode,
        message,
        errorCode,
        timestamp: new Date().toISOString(),
      },
      statusCode,
    );
  }
}
