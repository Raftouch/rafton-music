import { ApiProperty } from '@nestjs/swagger';
import { genres } from '@prisma/client';

export class GenreEntity implements genres {
  @ApiProperty()
  id: string;

  @ApiProperty()
  type: string;
}
