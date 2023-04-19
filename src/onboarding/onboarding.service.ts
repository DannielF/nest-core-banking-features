import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/accounts/account.service';
import { BlockSeizureService } from 'src/block-seizures/block-seizures.service';
import { CreateAccountChangeStateDto } from 'src/block-seizures/dto/create-account-change-state.dto';
import { CreateBlockFundsDto } from 'src/block-seizures/dto/create-block-funds.dto';
import { CreateSeizureFundsDto } from 'src/block-seizures/dto/create-siezure-funds.dto';
import { ClientService } from 'src/clients/client.service';
import { HeaderService } from 'src/config/header/header.config';
import { CreateApplyInterest } from 'src/fee-interest/dto/create-fee-interest.dto';
import { FeeInterestService } from 'src/fee-interest/fee-interest.service';
import { CreateDepositDto } from 'src/transactions/dto/create-deposit.dto';
import { CreateWithdrawDto } from 'src/transactions/dto/create-withdraw.dto';
import { TransactionsService } from 'src/transactions/transactions.service';
import { OnboardingClientDTO } from './dto/onboarding-client.dto';

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
      notes: 'Block funds standard service',
    };
    const responseBlock = await this.blockSeizureService.blockFunds(
      request.accountId,
      requestBlock,
    );

    const requestSeizure: CreateSeizureFundsDto = {
      amount: request.amount,
      blockId: responseBlock.externalReferenceId,
      notes: 'Seizure funds standard service',
      transactionChannelId: 'cash',
    };
    const responseSeizure = await this.blockSeizureService.seizureFunds(
      request.accountId,
      requestSeizure,
    );
    return { responseBlock, responseSeizure };
  }

  async payInterestAccrued(request: { accountId: string }) {
    const currentDate: Date = new Date();
    const dateString: string = currentDate
      .toISOString()
      .replace(/\.\d+Z$/, '-05:00');

    const requestInterest: CreateApplyInterest = {
      interestApplicationDate: dateString,
      notes: 'Pay interest standard service',
    };

    const response = await this.feeInterestService.forceApplyInterest(
      request.accountId,
      requestInterest,
    );
    return response;
  }

  async blockAccount(request: { accountId: string }) {
    const requestBlockAccount: CreateAccountChangeStateDto = {
      action: 'BLOCK',
      notes: 'Block account standard service',
    };
    const responseBlockAccount =
      await this.blockSeizureService.accountChangeState(
        request.accountId,
        requestBlockAccount,
      );
    return responseBlockAccount;
  }

  async depositAccount(request: { accountId: string; amount: string }) {
    const { idempotency_key } = this.headerService.headers;

    const requestBody: CreateDepositDto = {
      amount: request.amount,
      notes: 'Deposit standard service',
      transactionDetails: {
        transactionChannelId: 'OnlineChannelLocales',
      },
      paymentOrderId: idempotency_key,
      externalId: idempotency_key,
    };
    const depositResponse = await this.transactionService.makeDeposit(
      request.accountId,
      requestBody,
    );
    return depositResponse;
  }

  async withdrawAccount(request: { accountId: string; amount: string }) {
    const { idempotency_key } = this.headerService.headers;

    const requestBody: CreateWithdrawDto = {
      amount: request.amount,
      notes: 'Withdraw standard service',
      transactionDetails: {
        transactionChannelId: 'OnlineChannelLocales',
      },
      paymentOrderId: idempotency_key,
      externalId: idempotency_key,
    };
    const withdrawResponse = await this.transactionService.makeWithdraw(
      request.accountId,
      requestBody,
    );
    return withdrawResponse;
  }
}
