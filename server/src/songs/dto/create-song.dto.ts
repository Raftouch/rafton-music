import { ApiProperty } from '@nestjs/swagger';
import { CreateArtistDto } from '../../artists/dto/create-artist.dto';
import { CreateGenreDto } from '../../genres/dto/create-genre.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @ApiProperty()
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
