import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ERole } from 'src/domain/users/entities/enum-role';
import { User } from 'src/domain/users/entities/user';
import { ROLES_KEY } from 'src/interfaces/core/decorators/roles.decorator';

/**
 * A guard that protects routes based on user roles.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  /**
   * @param {Reflector} reflector - The reflector to access metadata.
   */
  constructor(private reflector: Reflector) {}

  /**
   * Determines if a route can be activated based on the user's role.
   * @param {ExecutionContext} context - The execution context.
   * @returns {boolean} `true` if the user has the required role, otherwise `false`.
   */
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<ERole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<{ user?: User }>();

    // Check if the user has the SuperAdmin role (which has all permissions)
    if (user?.role === ERole.SuperAdmin) {
      return true;
    }

    return requiredRoles.some((role) => user?.role === role);
  }
}
