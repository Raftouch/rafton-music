import { ApiProperty } from '@nestjs/swagger';
import { CreateArtistDto } from 'src/artists/dto/create-artist.dto';
import { CreateGenreDto } from 'src/genres/dto/create-genre.dto';

export class CreateSongDto {
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

  @ApiProperty({ type: CreateArtistDto })
  artist: CreateArtistDto;

  @ApiProperty({ type: CreateGenreDto })
  genre: CreateGenreDto;

  // @ApiProperty({ type: CreateUserDto })
  // username: CreateUserDto;
}
