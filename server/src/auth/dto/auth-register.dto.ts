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
import * as escape from 'escape-html';

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
  @Transform(({ value }) => escape(value))
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @Transform(({ value }) => {
    const sanitizedEmail = value.replace(/[^a-zA-Z0-9@.-_+]+/g, '').trim();
    return sanitizedEmail;
  })
  @Transform(({ value }) => value.trim())
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(12, { message: 'Password must be at least 12 characters long' })
  @MaxLength(20, { message: 'Password cannot be longer than 20 characters' })
  @Matches(
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>!'()*+,-./:;<=>?[\]^_`{|}~ €]).+$/,
    {
      message:
        'Password must contain at least one uppercase letter, one number, and one special character (e.g., !@#$%^&*)',
    },
  )
  @Transform(({ value }) => value.trim())
  password: string;

  @ApiProperty({ enum: Role, default: 'BASIC' })
  @IsEnum(Role)
  @IsOptional()
  role: Role = 'BASIC';
}
