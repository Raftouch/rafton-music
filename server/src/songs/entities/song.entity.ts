import { ApiProperty } from '@nestjs/swagger';
import { Artist, Genre, Song } from '@prisma/client';

export class SongEntity implements Song {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  image: string | null;

  @ApiProperty()
  audio: string;

  @ApiProperty({ required: false })
  duration: string | null;

  @ApiProperty()
  play_count: number;

  @ApiProperty()
  artists: {
    connect: Artist[];
  };

  @ApiProperty()
  genres: {
    connect: Genre[];
  };

  @ApiProperty({ required: false })
  uploaded_by_id: number;

  @ApiProperty({ required: false })
  favourited_by_id: number;

  @ApiProperty({ required: false })
  listened_by_id: number;
}
