import { ApiProperty } from '@nestjs/swagger';

export class RescheduleLoanDto {
  @ApiProperty({ example: '2021-01-01T00:00:00-05:00' })
  firstRepaymentDate?: string;
  @ApiProperty()
  productTypeKey?: string;
  @ApiProperty()
  loanAccountId: string;
}
