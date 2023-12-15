import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  songs: string[];
}
