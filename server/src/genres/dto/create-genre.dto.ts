import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsAlphanumeric,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import * as escape from 'escape-html';

export class CreateGenreDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: 'Genre type cannot be longer than 50 characters' })
  @IsAlphanumeric('en-US', {
    message: 'Genre type must contain only alphanumeric characters',
  })
  @Transform(({ value }) => value.trim())
  @Transform(({ value }) => escape(value))
  type: string;
}
