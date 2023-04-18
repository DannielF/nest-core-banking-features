import { ApiProperty } from '@nestjs/swagger';

class TransactionDetails {
  transactionChannelId: string;
}
export class CreateDepositDto {
  @ApiProperty({ example: '1000' })
  amount: string;
  @ApiProperty({ example: 'transactionChannelId: cash' })
  transactionDetails: TransactionDetails;
  @ApiProperty({ example: 'deposit' })
  notes: string;
  @ApiProperty({ example: 'UUID' })
  paymentOrderId: string;
  @ApiProperty({ example: 'UUID' })
  externalId: string;
}
