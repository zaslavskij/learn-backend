import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  password: string;
}
