import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateCourceDto {
  @ApiProperty({ required: true })
  @IsString()
  @MaxLength(140)
  @IsNotEmpty()
  @IsDefined()
  title: string;

  @ApiProperty({ required: true })
  @IsString()
  @MaxLength(1400)
  @IsNotEmpty()
  @IsDefined()
  description: string;
}
