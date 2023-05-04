import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
import { CurrentDateISO } from 'src/common/get-current-date';
import { OnboardingLoanDTO } from './dto/onboarding-loan.dto';
import { CreateLoanDto } from 'src/accounts/dto/create-loan.dto';

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
    try {
      const clientResponse = await this.clientService.create(client);
      const productInfo = await this.accountService.getEcodedProduct(idProduct);

      const accountResponse = await this.accountService.createDeposit({
        accountHolderKey: clientResponse.encodedKey,
        accountHolderType: client.holderType,
        name: `${clientResponse.firstName} ${clientResponse.lastName}`,
        productTypeKey: productInfo.encodedKey,
        accountType: productInfo.type,
        accountState: 'APPROVED',
        currencyCode: productInfo.currencySettings.currencies[0].currencyCode,
      });

      return { clientResponse, accountResponse };
    } catch (error) {
      throw new HttpException(
        {
          reason: error.response,
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  async lastTransactions(depositAccountId: string, limit: string) {
    try {
      const response = await this.transactionService.transactionsClient(
        depositAccountId,
        '0',
        limit,
        'OFF',
        'BASIC',
      );
      return response;
    } catch (error) {
      throw new HttpException(
        {
          reason: error.response,
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  async blockFunds(request: { accountId: string; amount: string }) {
    const { idempotency_key } = this.headerService.headers;
    try {
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
    } catch (error) {
      throw new HttpException(
        {
          reason: error.response,
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  async payInterestAccrued(request: { accountId: string }) {
    try {
      const requestInterest: CreateApplyInterest = {
        interestApplicationDate: CurrentDateISO.get(),
        notes: 'Pay interest standard service',
      };

      const response = await this.feeInterestService.forceApplyInterest(
        request.accountId,
        requestInterest,
      );
      return response;
    } catch (error) {
      throw new HttpException(
        {
          reason: error.response,
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  async blockAccount(request: { accountId: string }) {
    const requestBlockAccount: CreateAccountChangeStateDto = {
      action: 'LOCK',
      notes: 'Block account standard service',
    };
    try {
      const responseBlockAccount =
        await this.blockSeizureService.accountChangeState(
          request.accountId,
          requestBlockAccount,
        );
      return responseBlockAccount;
    } catch (error) {
      throw new HttpException(
        {
          reason: error.response,
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
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
    try {
      const depositResponse = await this.transactionService.makeDeposit(
        request.accountId,
        requestBody,
      );
      return depositResponse;
    } catch (error) {
      throw new HttpException(
        {
          reason: error.response,
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
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
    try {
      const withdrawResponse = await this.transactionService.makeWithdraw(
        request.accountId,
        requestBody,
      );
      return withdrawResponse;
    } catch (error) {
      throw new HttpException(
        {
          reason: error.response,
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  async createClientAndLoan(request: OnboardingLoanDTO) {
    const {
      interestRate,
      gracePeriod,
      repaymentInstallments,
      loanAmount,
      penaltyRate,
    } = request;

    try {
      const clientBody = {
        firstName: request.firstName,
        lastName: request.lastName,
        documentId: request.documentId,
        email: request.email,
        gender: request.gender,
        holderType: 'CLIENT',
        _personalizados: {
          External_ID: this.headerService.headers.idempotency_key,
        },
      };
      const clientResponse = await this.clientService.create(clientBody);

      const loanBody: CreateLoanDto = {
        accountHolderKey: clientResponse.encodedKey,
        accountHolderType: 'CLIENT',
        interestSettings: {
          interestRate: interestRate,
        },
        loanAmount: loanAmount,
        productTypeKey: '8a44c9b68220b5140182263c6e27577c',
        scheduleSettings: {
          gracePeriod: gracePeriod,
          repaymentInstallments: repaymentInstallments,
        },
        penaltySettings: {
          penaltyRate: penaltyRate,
        },
      };
      const loanResponse = await this.accountService.createLoan(loanBody);

      return { clientResponse, loanResponse };
    } catch (error) {
      throw new HttpException(
        {
          reason: error.response,
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  async approveLoanAccount(request: { loanAccountId: string }) {
    try {
      return await this.accountService.approveLoan(request.loanAccountId);
    } catch (error) {
      throw new HttpException(
        {
          reason: error.response,
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  async disburseLoanAccount(request: { loanAccountId: string }) {
    try {
      return await this.transactionService.makeLoanDisbursement(
        request.loanAccountId,
      );
    } catch (error) {
      throw new HttpException(
        {
          reason: error.response,
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  async blockLoanAccount(request: {
    loanAccountId: string;
    operations: string[];
  }) {
    try {
      return await this.accountService.lockLoan({
        operations: request.operations,
        loanAccountId: request.loanAccountId,
      });
    } catch (error) {
      throw new HttpException(
        {
          reason: error.response,
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  async getLoanAccount(loanAccountId: string) {
    try {
      return await this.transactionService.getLoanAccountById(loanAccountId);
    } catch (error) {
      throw new HttpException(
        {
          reason: error.response,
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  async changeLoanInterestRate(request: {
    interest: number;
    loanAccountId: string;
  }) {
    try {
      return await this.feeInterestService.changeLoanInterestRate(request);
    } catch (error) {
      throw new HttpException(
        {
          reason: error.response,
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  async payOffLoan(request: { loanAccountId: string }) {
    try {
      return await this.transactionService.payingOffLoan({
        loanAccountId: request.loanAccountId,
      });
    } catch (error) {
      throw new HttpException(
        {
          reason: error.response,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
}
