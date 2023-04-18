import { ApiProperty } from '@nestjs/swagger';

export class CreateBlockFundsDto {
  @ApiProperty({ example: '1000' })
  amount: string;
  @ApiProperty({ example: 'UUID' })
  externalReferenceId: string;
  @ApiProperty({ example: 'Lorem ipsup' })
  notes: string;
}
