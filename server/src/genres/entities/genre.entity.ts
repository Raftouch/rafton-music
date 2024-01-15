import { ApiProperty } from '@nestjs/swagger';
import { Genre } from '@prisma/client';

export class GenreEntity implements Genre {
  @ApiProperty()
  id: number;

  @ApiProperty()
  type: string;
}
