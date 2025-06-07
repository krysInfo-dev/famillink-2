import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ERole } from 'src/domain/users/entities/enum-role';
import { User } from 'src/domain/users/entities/user';
import { ROLES_KEY } from 'src/interfaces/core/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<ERole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const user: User | undefined = context.switchToHttp().getRequest();

    // Vérifier si l'utilisateur a le rôle SuperAdmin (qui a toutes les permissions)
    if (user?.role === ERole.SuperAdmin) {
      return true;
    }

    return requiredRoles.some((role) => user?.role === role);
  }
}
