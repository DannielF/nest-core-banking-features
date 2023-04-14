export class CreateAccountDto {
  readonly accountHolderKey: string;
  readonly accountHolderType?: string;
  readonly name: string;
  readonly productTypeKey: string;
  readonly notes?: string;
  readonly accountState?: string;
  readonly accountType: string;
  readonly currencyCode: string;
}
