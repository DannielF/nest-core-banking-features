import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/accounts/account.service';
import { ClientService } from 'src/clients/client.service';
import { OnboardingClientDTO } from './dto/onboarding-client.dto';
import { TransactionsService } from 'src/transactions/transactions.service';

@Injectable()
export class OnboardingService {
  constructor(
    private readonly clientService: ClientService,
    private readonly accountService: AccountService,
    private readonly transactionService: TransactionsService,
  ) {}

  async createClient(request: OnboardingClientDTO) {
    const { idProduct, ...client } = request;

    const clientResponse = await this.clientService.create(client);
    const productInfo = await this.accountService.getEcodedProduct(idProduct);

    const accountResponse = await this.accountService.createDeposit({
      accountHolderKey: clientResponse.encodedKey,
      accountHolderType: client.holderType,
      name: `${clientResponse.firstName} ${clientResponse.lastName}`,
      productTypeKey: productInfo.encodedKey,
      accountType: productInfo.type,
      currencyCode: productInfo.currencySettings.currencies[0].currencyCode,
    });

    return { clientResponse, accountResponse };
  }

  async lastTransactions(depositAccountId: string, limit: string) {
    const response = await this.transactionService.transactionsClient(
      depositAccountId,
      '0',
      limit,
      'OFF',
      'BASIC',
    );
    return response;
  }
}
