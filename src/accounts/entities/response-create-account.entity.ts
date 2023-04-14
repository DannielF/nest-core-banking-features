import { ApiProperty } from '@nestjs/swagger';

export class ResponseCreateAccountEntity {
  @ApiProperty()
  encodedKey: string;
  @ApiProperty()
  id: string;
  @ApiProperty()
  accountType: string;
}
