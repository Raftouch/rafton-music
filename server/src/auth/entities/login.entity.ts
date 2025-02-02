import { ApiProperty } from '@nestjs/swagger';

export class LoginEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token: string;
}
