import { SetMetadata } from '@nestjs/common';

/**
 * Key for storing public metadata.
 * @type {string}
 */
export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Decorator to mark a route as public (no authentication required).
 * @returns {ReturnType<typeof SetMetadata>}
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
