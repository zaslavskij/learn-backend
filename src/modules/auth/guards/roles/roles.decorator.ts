import { SetMetadata } from '@nestjs/common';
import { UserRoleEnum } from '@prisma/client';

export const HasRoles = (...roles: UserRoleEnum[]) =>
  SetMetadata('roles', roles);
