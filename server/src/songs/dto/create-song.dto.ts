import { ApiProperty } from '@nestjs/swagger';

export class CreateSongDto {
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
