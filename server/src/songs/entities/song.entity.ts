import { ApiProperty } from '@nestjs/swagger';
import { songs } from '@prisma/client';

export class SongEntity implements songs {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  image: string;

  @ApiProperty()
  audio: string;

  @ApiProperty({ default: 0 })
  playcount: number;

  @ApiProperty({ default: Date.now() })
  uploadedat: Date;

  @ApiProperty()
  artist_id: string;

  @ApiProperty()
  genre_id: string;

  @ApiProperty({ required: false })
  user_id: string;
}
