import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateCourceDto {
  @ApiProperty({ required: true })
  @IsString()
  @MaxLength(140)
  @IsNotEmpty()
  @IsDefined()
  title: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @MaxLength(2000)
  description: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  ownerId: number;
}
