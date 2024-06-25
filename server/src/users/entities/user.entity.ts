import { ApiProperty } from '@nestjs/swagger';
import { Role, User } from '@prisma/client';

export class UserEntity implements User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  // password should not be recorded in Swagger, as it's sensitive data
  password: string;

  @ApiProperty({ default: Role.BASIC })
  role: Role;

  @ApiProperty()
  registeredAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
