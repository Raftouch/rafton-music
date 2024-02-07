import { ApiProperty } from '@nestjs/swagger';
// import { IsString, IsUUID } from 'class-validator';

export class CreateArtistDto {
  // @ApiProperty({ required: false })
  // @IsUUID()
  // id?: string;

  @ApiProperty()
  // @IsString()
  name: string;
}
