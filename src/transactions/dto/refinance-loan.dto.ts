import { ApiProperty } from '@nestjs/swagger';

export class RefinanceLoanDto {
  @ApiProperty()
  productTypeKey?: string;
  @ApiProperty({ example: '2021-01-01T00:00:00-05:00' })
  firstRepaymentDate?: string;
  @ApiProperty()
  interestRate?: number;
  @ApiProperty()
  gracePeriod?: number;
  @ApiProperty()
  repaymentInstallments: number;
  @ApiProperty()
  topUpAmount: number;
  @ApiProperty()
  loanAccountId: string;
}
