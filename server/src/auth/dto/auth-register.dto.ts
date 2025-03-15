import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
  IsEnum,
  IsOptional,
  MaxLength,
  IsAlphanumeric,
} from 'class-validator';
import { Transform } from 'class-transformer';
import * as validator from 'validator';

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  @MaxLength(50, { message: 'Username cannot be longer than 50 characters' })
  @IsAlphanumeric('en-US', {
    message: 'Username must be alphanumeric (letters and numbers only)',
  })
  @Transform(({ value }) => value.trim())
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @Transform(({ value }) => {
    return validator.normalizeEmail(value);
  })
  @Transform(({ value }) => value.trim())
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(12, { message: 'Password must be at least 12 characters long' })
  @MaxLength(20, { message: 'Password cannot be longer than 20 characters' })
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/, {
    message:
      'Password must contain at least one uppercase letter, one number, and one special character',
  })
  @Transform(({ value }) => value.trim())
  password: string;

  @ApiProperty({ enum: Role, default: 'BASIC' })
  @IsEnum(Role)
  @IsOptional()
  role: Role = 'BASIC';
}
