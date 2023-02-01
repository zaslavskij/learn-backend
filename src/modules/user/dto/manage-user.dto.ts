import { ApiProperty } from '@nestjs/swagger';
import { UserRoleEnum } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class ManageUserDto {
  @ApiProperty({ required: true })
  @IsString()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;
}
