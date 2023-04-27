import { ApiProperty } from '@nestjs/swagger';

class Currency {
  code: string;
}

export class LoanProductInfo {
  @ApiProperty({
    example: '8a8e878e71c7c8a10171ca0f1f1d0001',
    description: 'The encoded key of the product',
  })
  encodedKey: string;
  @ApiProperty({ type: Currency, description: 'The currency of the product' })
  currency: Currency;
  @ApiProperty({
    example: 'TERM_LOAN',
    description: 'Loan product type',
  })
  type: string;
}
