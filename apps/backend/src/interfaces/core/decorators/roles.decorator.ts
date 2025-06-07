import { SetMetadata } from '@nestjs/common';
import { ERole } from 'src/domain/users/entities/enum-role';

/**
 * Key for storing roles metadata.
 * @type {string}
 */
export const ROLES_KEY = 'roles';

/**
 * Decorator to set the required roles for a route.
 * @param {ERole[]} roles - The list of required roles.
 * @returns {ReturnType<typeof SetMetadata>}
 */
export const Roles = (...roles: ERole[]) => SetMetadata(ROLES_KEY, roles);
