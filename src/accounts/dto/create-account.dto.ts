import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty({ example: '1234567890', description: 'Client id' })
  readonly accountHolderKey: string;
  @ApiProperty({ example: 'CLIENT', description: 'Client type' })
  readonly accountHolderType?: string;
  @ApiProperty({
    example: 'client.name client.lastname',
    description: 'Account name',
  })
  readonly name: string;
  @ApiProperty({ example: '1234567890', description: 'Product id' })
  readonly productTypeKey: string;
  @ApiProperty({ example: 'lorem ipsup', description: 'Notes to add' })
  readonly notes?: string;
  @ApiProperty({ example: 'ACTIVE', description: 'Account status' })
  readonly accountState?: string;
  @ApiProperty({ example: 'SAVINGS', description: 'Account type' })
  readonly accountType: string;
  @ApiProperty({ example: 'USD', description: 'Currency code' })
  readonly currencyCode: string;
}
