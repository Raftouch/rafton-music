import { Artist } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ArtistEntity implements Artist {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}
