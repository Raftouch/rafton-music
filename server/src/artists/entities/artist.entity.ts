import { artists } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ArtistEntity implements artists {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}
