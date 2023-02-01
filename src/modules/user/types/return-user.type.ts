import { User, UserRole, UserRoleEnum } from '@prisma/client';

interface RoleDb {
  role: UserRole;
}

interface RoleEnum {
  role: UserRoleEnum;
}

export interface UserFromDb extends User, RoleDb {}

export interface UserCleanWithPassword
  extends Pick<User, 'email' | 'password'>,
    RoleEnum {}

export type UserCleanNoPassword = Omit<UserCleanWithPassword, 'password'>;
