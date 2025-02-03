import { ApiProperty } from '@nestjs/swagger';

export class RegisterEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  message: string;
}
