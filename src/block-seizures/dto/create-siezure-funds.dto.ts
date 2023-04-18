import { ApiProperty } from '@nestjs/swagger';

export class CreateSeizureFundsDto {
  @ApiProperty({ example: '1000' })
  amount?: string;
  @ApiProperty({ example: 'externalReferenceId' })
  blockId: string;
  @ApiProperty({ example: 'UUID' })
  externalId?: string;
  @ApiProperty({ example: 'Lorem ipsup' })
  notes?: string;
  @ApiProperty({ example: 'transactionChannelId: cash' })
  transactionChannelId: string;
}
