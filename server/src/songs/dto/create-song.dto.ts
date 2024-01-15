import { ApiProperty } from '@nestjs/swagger';
import { Artist, Genre, User } from '@prisma/client';

export class CreateSongDto {
  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  image: string;

  @ApiProperty()
  audio: string;

  @ApiProperty({ default: 0 })
  playCount: number;

  @ApiProperty()
  artist: {
    connect: Artist;
  };

  @ApiProperty()
  genre: {
    connect: Genre;
  };

  @ApiProperty({ required: false })
  uploadedBy: {
    connect: User;
  };

  @ApiProperty({ default: Date.now() })
  uploadedAt: Date;
}
