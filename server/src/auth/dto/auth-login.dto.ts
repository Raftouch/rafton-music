import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
  MaxLength,
  IsAlphanumeric,
} from 'class-validator';
import { Transform } from 'class-transformer';
import * as escape from 'escape-html';

export class LoginDto {
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
}
