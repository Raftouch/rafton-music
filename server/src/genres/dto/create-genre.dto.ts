import { ApiProperty } from '@nestjs/swagger';

export class CreateGenreDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  type: string;
}
