import { ApiProperty } from '@nestjs/swagger';

export class SongEntity {
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
  uploadedAt: Date;

  @ApiProperty()
  artist: {
    id: string;
    name: string;
  };

  @ApiProperty()
  genre: {
    id: string;
    type: string;
  };

  // @ApiProperty()
  // user_id?: string;
}
