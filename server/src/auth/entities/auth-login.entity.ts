import { ApiProperty } from '@nestjs/swagger';
import { Song } from '@prisma/client';

export class LoginEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  favoriteSongs?: Song[];

  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token: string;
}
