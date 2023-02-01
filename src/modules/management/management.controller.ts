import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiConsumes } from '@nestjs/swagger';
import { UserRoleEnum } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt/jwt.guard';
import { HasRoles } from '../auth/guards/roles/roles.decorator';
import { RolesGuard } from '../auth/guards/roles/roles.guard';

import { ManageUserDto } from '../user/dto/manage-user.dto';
import { UserService } from '../user/user.service';

@Controller('manage')
export class ManagementController {
  constructor(private readonly usersService: UserService) {}

  @Post('user')
  @HasRoles(UserRoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiConsumes('application/json')
  async manageUser(@Body() user: ManageUserDto) {
    return this.usersService.changeUserRole(user);
  }
}
