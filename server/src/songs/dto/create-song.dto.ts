import { ApiProperty } from '@nestjs/swagger';
import { Artist, Genre, User } from '@prisma/client';

export class CreateSongDto {
  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  image: string;

  @ApiProperty()
  audio: string;

  @ApiProperty({ required: false })
  duration: string;

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

  @ApiProperty()
  uploaded_by?: {
    connect: User;
  };

  @ApiProperty()
  favourited_by?: {
    connect: User;
  };

  @ApiProperty()
  listened_by?: {
    connect: User;
  };
}
