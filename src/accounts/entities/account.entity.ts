import { ApiProperty } from '@nestjs/swagger';

export class Account {
  @ApiProperty({ example: '1234567890', description: 'Client id' })
  private accountHolderKey: string;
  @ApiProperty({ example: 'CLIENT', description: 'Client type' })
  private accountHolderType: string;
  @ApiProperty({
    example: 'client.name client.lastname',
    description: 'Account name',
  })
  private name: string;
  @ApiProperty({ example: '1234567890', description: 'Product id' })
  private productTypeKey: string;
  @ApiProperty({ example: 'lorem ipsup', description: 'Notes to add' })
  private notes: string;
  @ApiProperty({ example: 'ACTIVE', description: 'Account status' })
  private accountState: string;
  @ApiProperty({ example: 'SAVINGS', description: 'Account type' })
  private accountType: string;
  @ApiProperty({ example: 'USD', description: 'Currency code' })
  private currencyCode: string;
}
