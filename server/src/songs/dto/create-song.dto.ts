import { ApiProperty } from '@nestjs/swagger';
import { CreateArtistDto } from '../../artists/dto/create-artist.dto';
import { CreateGenreDto } from '../../genres/dto/create-genre.dto';
import {
  IsAlphanumeric,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import * as escape from 'escape-html';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(50, { message: 'Title cannot be longer than 50 characters' })
  @Matches(/^[a-zA-Z0-9\s;,._\-?]+$/, {
    message:
      'Title can only contain alphanumeric characters, spaces, and the following special characters: ; , - _ ? : .',
  })
  @Transform(({ value }) => value.trim())
  @Transform(({ value }) => escape(value))
  title: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  audio: string;

  @ApiProperty({ default: 0 })
  playcount: number;

  @ValidateNested()
  @Type(() => CreateArtistDto)
  @ApiProperty({ type: CreateArtistDto })
  artist: CreateArtistDto;

  @ValidateNested()
  @Type(() => CreateGenreDto)
  @ApiProperty({ type: CreateGenreDto })
  genre: CreateGenreDto;

  // @ApiProperty({ type: CreateUserDto })
  // username: CreateUserDto;
}
