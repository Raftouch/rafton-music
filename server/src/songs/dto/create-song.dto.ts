import { ApiProperty } from '@nestjs/swagger';
import { CreateArtistDto } from '../../artists/dto/create-artist.dto';
import { CreateGenreDto } from '../../genres/dto/create-genre.dto';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

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
