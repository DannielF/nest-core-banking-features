import { ApiProperty } from '@nestjs/swagger';

class CurrencySettings {
  @ApiProperty()
  currencies: Currency[];
}

class Currency {
  @ApiProperty()
  currencyCode: string;
  code: string;
}
export class ResponseGetProductEntity {
  @ApiProperty()
  encodedKey: string;
  @ApiProperty()
  id: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  currencySettings: CurrencySettings;
}
