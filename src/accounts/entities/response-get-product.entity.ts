export class ResponseGetProductEntity {
  encodedKey: string;
  id: string;
  type: string;
  currencySettings: CurrencySettings;
}

export class CurrencySettings {
  currencies: Currency[];
}

export class Currency {
  currencyCode: string;
  code: string;
}
