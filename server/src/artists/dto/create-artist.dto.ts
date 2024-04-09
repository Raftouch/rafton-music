import { ApiProperty } from '@nestjs/swagger';
// import { IsString, IsUUID } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty()
  id: string;
  // @IsUUID()

  @ApiProperty()
  // @IsString()
  name: string;
}
