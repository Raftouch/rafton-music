import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Role, User } from '@prisma/client';

export class UserEntity implements User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  // password & refresh token should not be recorded in Swagger
  @ApiHideProperty()
  password: string;

  @ApiHideProperty()
  refreshToken: string;

  @ApiProperty({ default: Role.BASIC })
  role: Role;

  @ApiProperty()
  registeredAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
