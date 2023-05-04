import { ApiProperty } from '@nestjs/swagger';

export class MakeRepaymentDto {
  @ApiProperty({ example: 100000 })
  amount: number;
  @ApiProperty({ example: 'SGV123' })
  loanAccountId: string;
  @ApiProperty({ example: 'Lorem ipsup' })
  notes?: string;
}
