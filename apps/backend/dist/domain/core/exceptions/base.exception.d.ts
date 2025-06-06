import { HttpException, HttpStatus } from '@nestjs/common';
export declare class BaseException extends HttpException {
    readonly errorCode?: string | undefined;
    constructor(message: string, statusCode: HttpStatus, errorCode?: string | undefined);
}
