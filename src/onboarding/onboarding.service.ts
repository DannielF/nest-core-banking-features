import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/accounts/account.service';
import { ClientService } from 'src/clients/client.service';
import { OnboardingClientDTO } from './dto/onboarding-client.dto';
import { TransactionsService } from 'src/transactions/transactions.service';
import { BlockSeizureService } from 'src/block-seizures/block-seizures.service';
import { CreateBlockFundsDto } from 'src/block-seizures/dto/create-block-funds.dto';
import { HeaderService } from 'src/config/header/header.config';
import { FeeInterestService } from 'src/fee-interest/fee-interest.service';
import { CreateApplyInterest } from 'src/fee-interest/dto/create-fee-interest.dto';

@Injectable()
export class OnboardingService {
  constructor(
    private readonly clientService: ClientService,
    private readonly accountService: AccountService,
    private readonly transactionService: TransactionsService,
    private readonly blockSeizureService: BlockSeizureService,
    private readonly feeInterestService: FeeInterestService,
    private readonly headerService: HeaderService,
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

  async blockFunds(request: { accountId: string; amount: string }) {
    const { idempotency_key } = this.headerService.headers;

    const requestBlock: CreateBlockFundsDto = {
      amount: request.amount,
      externalReferenceId: idempotency_key,
      notes: 'Block funds onboarding service',
    };

    const response = await this.blockSeizureService.blockFunds(
      request.accountId,
      requestBlock,
    );
    return response;
  }

  async payInterestAccrued(request: { accountId: string; date: string }) {
    const requestInterest: CreateApplyInterest = {
      interestApplicationDate: request.date,
      isPaymentHolidaysInterest: false,
      paymentHolidaysInterestAmount: 0,
      notes: 'Pay interest onboarding service',
    };

    const response = await this.feeInterestService.forceApplyInterest(
      request.accountId,
      requestInterest,
    );
    return response;
  }
}
