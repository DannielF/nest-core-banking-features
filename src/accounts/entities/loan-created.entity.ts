import { ApiProperty } from '@nestjs/swagger';

export class ResponseLoanCreated {
  @ApiProperty()
  encodedKey: string;
  @ApiProperty()
  id: string;
  @ApiProperty()
  productTypeKey: string;
}
