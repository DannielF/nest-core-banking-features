import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/accounts/account.service';
import { ClientService } from 'src/clients/client.service';
import { OnboardingClientDTO } from './dto/onboarding-client.dto';

@Injectable()
export class OnboardingService {
  constructor(
    private readonly clientService: ClientService,
    private readonly accountService: AccountService,
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
}
