import { ApiProperty } from '@nestjs/swagger';
import { Song } from '@prisma/client';

export class SongEntity implements Song {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  image: string | null;

  @ApiProperty()
  audio: string;

  @ApiProperty({ default: 0 })
  playCount: number;

  @ApiProperty()
  artistId: number;

  @ApiProperty()
  genreId: number;

  @ApiProperty({ required: false })
  userId: number;

  @ApiProperty({ default: Date.now() })
  uploadedAt: Date;
}
