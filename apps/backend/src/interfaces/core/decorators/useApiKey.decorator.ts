import { SetMetadata } from '@nestjs/common';

/**
 * Key for storing API key usage metadata.
 * @type {string}
 */
export const IS_API_KEY = 'isUseApiKey';

/**
 * Decorator to indicate that a route requires an API key for authentication.
 * @returns {ReturnType<typeof SetMetadata>}
 */
export const UseApiKey = () => SetMetadata(IS_API_KEY, true);
