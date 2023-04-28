import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HeaderService } from 'src/config/header/header.config';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { SearchFilterDTO } from './dto/create-search-filter.dto';
import { CreateWithdrawDto } from './dto/create-withdraw.dto';
import { DisbursementLoanDto } from './dto/make-disbursement-loan.dto';
import { CurrentDateISO } from 'src/common/get-current-date';

@Injectable()
export class TransactionsService {
  constructor(private readonly headerService: HeaderService) {}

  async makeDeposit(id: string, createTransactionDto: CreateDepositDto) {
    return await fetch(
      `${this.headerService.baseUrl}/deposits/${id}/deposit-transactions`,
      {
        method: 'POST',
        headers: this.headerService.headers,
        body: JSON.stringify(createTransactionDto),
      },
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          throw new HttpException(data.errors, HttpStatus.BAD_REQUEST);
        }
        return data;
      })
      .catch((error) => {
        throw new HttpException(
          {
            error: 'Check your request body or params',
            mambuError: error.response,
          },
          HttpStatus.BAD_REQUEST,
          { cause: new Error() },
        );
      });
  }

  async makeWithdraw(id: string, createTransactionDto: CreateWithdrawDto) {
    return await fetch(
      `${this.headerService.baseUrl}/deposits/${id}/withdrawal-transactions`,
      {
        method: 'POST',
        headers: this.headerService.headers,
        body: JSON.stringify(createTransactionDto),
      },
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          throw new HttpException(data.errors, HttpStatus.BAD_REQUEST);
        }
        return data;
      })
      .catch((error) => {
        throw new HttpException(
          {
            error: 'Check your request body or params',
            mambuError: error.response,
          },
          HttpStatus.BAD_REQUEST,
          { cause: new Error() },
        );
      });
  }

  async transactionsClient(
    depositAccountId: string,
    offset?: string,
    limit?: string,
    paginationDetails?: string,
    detailsLevel?: string,
  ) {
    const { Accept, Authorization } = this.headerService.headers;
    const queryParams = new URLSearchParams({
      offset: offset ?? '0',
      limit: limit ?? '10',
      paginationDetails: paginationDetails ?? 'OFF',
      detailsLevel: detailsLevel ?? 'BASIC',
    }).toString();

    return await fetch(
      `${this.headerService.baseUrl}/deposits/${depositAccountId}/transactions?${queryParams}`,
      {
        method: 'GET',
        headers: { Accept, Authorization },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          throw new HttpException(data.errors, HttpStatus.BAD_REQUEST);
        }
        return data;
      })
      .catch((error) => {
        throw new HttpException(
          {
            error: 'Check your request body or params',
            mambuError: error.response,
          },
          HttpStatus.BAD_REQUEST,
          { cause: new Error() },
        );
      });
  }

  async searchDeposits(createTransactionDto: SearchFilterDTO) {
    const { Accept, Authorization } = this.headerService.headers;
    return await fetch(`${this.headerService.baseUrl}/deposits:search`, {
      method: 'POST',
      headers: { Accept, Authorization, 'Content-Type': 'application/json' },
      body: JSON.stringify(createTransactionDto),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          throw new HttpException(data.errors, HttpStatus.BAD_REQUEST);
        }
        return data;
      })
      .catch((error) => {
        throw new HttpException(
          {
            error: 'Check your request body or params',
            mambuError: error.response,
          },
          HttpStatus.BAD_REQUEST,
          { cause: new Error() },
        );
      });
  }

  async transactions(
    createTransactionDto: SearchFilterDTO,
    offset?: string,
    limit?: string,
    paginationDetails?: string,
    detailsLevel?: string,
  ) {
    const queryParams = new URLSearchParams({
      offset: offset ?? '0',
      limit: limit ?? '10',
      paginationDetails: paginationDetails ?? 'OFF',
      detailsLevel: detailsLevel ?? 'FULL',
    }).toString();

    const { Accept, Authorization } = this.headerService.headers;
    return await fetch(
      `${this.headerService.baseUrl}/deposits/transactions:search?${queryParams}`,
      {
        method: 'POST',
        headers: { Accept, Authorization, 'Content-Type': 'application/json' },
        body: JSON.stringify(createTransactionDto),
      },
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          throw new HttpException(data.errors, HttpStatus.BAD_REQUEST);
        }
        return data;
      })
      .catch((error) => {
        throw new HttpException(
          {
            error: 'Check your request body or params',
            mambuError: error.response,
          },
          HttpStatus.BAD_REQUEST,
          { cause: new Error() },
        );
      });
  }

  async loanInstallments(loanAccountId: string) {
    const { Accept, Authorization } = this.headerService.headers;
    return await fetch(
      `${this.headerService.baseUrl}/loans/${loanAccountId}/schedule?detailsLevel=BASIC`,
      {
        method: 'GET',
        headers: { Accept, Authorization },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          throw new HttpException(data.errors, HttpStatus.BAD_REQUEST);
        }
        return data;
      })
      .catch((error) => {
        throw new HttpException(
          {
            error: 'Check your request body or params',
            mambuError: error.response,
          },
          HttpStatus.BAD_REQUEST,
          { cause: new Error() },
        );
      });
  }

  async makeLoanDisbursement(loanAccountId: string, body: DisbursementLoanDto) {
    const request = {
      externalId: this.headerService.headers.idempotency_key,
      transactionDetails: {
        transactionChannelId: 'OnlineChannelLocales',
      },
      ...body,
    };

    return await fetch(
      `${this.headerService.baseUrl}/loans/${loanAccountId}/disbursement-transactions`,
      {
        method: 'POST',
        headers: this.headerService.headers,
        body: JSON.stringify(request),
      },
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          throw new HttpException(data.errors, HttpStatus.BAD_REQUEST);
        }
        return data;
      })
      .catch((error) => {
        throw new HttpException(
          {
            error: 'Check your request body or params',
            mambuError: error.response,
          },
          HttpStatus.BAD_REQUEST,
          { cause: new Error() },
        );
      });
  }

  async disbursementLoanTransactions(body: {
    from: string;
    to: string;
    loanAccountKey: string;
  }) {
    const request = {
      filterCriteria: [
        {
          field: 'type',
          operator: 'EQUALS',
          value: 'DISBURSEMENT',
        },
        {
          field: 'creationDate',
          operator: 'BETWEEN',
          value: body.from,
          secondValue: body.to,
        },
        {
          field: 'parentAccountKey',
          operator: 'EQUALS',
          value: body.loanAccountKey,
        },
        {
          field: 'adjustmentTransactionKey',
          operator: 'EMPTY',
        },
      ],
      sortingCriteria: {
        field: 'creationDate',
        order: 'DESC',
      },
    };
    const { Accept, Authorization } = this.headerService.headers;
    return await fetch(
      `${this.headerService.baseUrl}/loans/transactions:search?detailsLevel=FULL`,
      {
        method: 'POST',
        headers: { Accept, Authorization, 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      },
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          throw new HttpException(data.errors, HttpStatus.BAD_REQUEST);
        }
        return data;
      })
      .catch((error) => {
        throw new HttpException(
          {
            error: 'Check your request body or params',
            mambuError: error.response,
          },
          HttpStatus.BAD_REQUEST,
          { cause: new Error() },
        );
      });
  }

  async paymentLoanTransactions(body: {
    from: string;
    to: string;
    loanAccountKey: string;
  }) {
    const request = {
      filterCriteria: [
        {
          field: 'type',
          operator: 'EQUALS',
          value: 'REPAYMENT',
        },
        {
          field: 'creationDate',
          operator: 'BETWEEN',
          value: body.from,
          secondValue: body.to,
        },
        {
          field: 'parentAccountKey',
          operator: 'EQUALS',
          value: body.loanAccountKey,
        },
        {
          field: 'adjustmentTransactionKey',
          operator: 'EMPTY',
        },
      ],
      sortingCriteria: {
        field: 'creationDate',
        order: 'DESC',
      },
    };
    const { Accept, Authorization } = this.headerService.headers;
    return await fetch(
      `${this.headerService.baseUrl}/loans/transactions:search?detailsLevel=FULL`,
      {
        method: 'POST',
        headers: { Accept, Authorization, 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      },
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          throw new HttpException(data.errors, HttpStatus.BAD_REQUEST);
        }
        return data;
      })
      .catch((error) => {
        throw new HttpException(
          {
            error: 'Check your request body or params',
            mambuError: error.response,
          },
          HttpStatus.BAD_REQUEST,
          { cause: new Error() },
        );
      });
  }

  async getLoanAccountById(loanAccountId: string) {
    const request = {
      filterCriteria: [
        {
          field: 'id',
          operator: 'EQUALS',
          value: loanAccountId,
        },
      ],
    };
    const { Accept, Authorization } = this.headerService.headers;
    return await fetch(
      `${this.headerService.baseUrl}/loans:search?detailsLevel=FULL`,
      {
        method: 'POST',
        headers: { Accept, Authorization, 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      },
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          throw new HttpException(data.errors, HttpStatus.BAD_REQUEST);
        }
        return data;
      })
      .catch((error) => {
        throw new HttpException(
          {
            error: 'Check your request body or params',
            mambuError: error.response,
          },
          HttpStatus.BAD_REQUEST,
          { cause: new Error() },
        );
      });
  }

  async payingOffLoan(body: {
    amount: number;
    notes: string;
    loanAccountId: string;
  }) {
    const request = {
      amount: body.amount,
      externalId: this.headerService.headers.idempotency_key,
      notes: body.notes,
      transactionDetails: {
        transactionChannelId: 'OnlineChannelLocales',
      },
      valueDate: CurrentDateISO.get(),
    };
    return await fetch(
      `${this.headerService.baseUrl}/loans/${body.loanAccountId}/withdrawal-transactions`,
      {
        method: 'POST',
        headers: this.headerService.headers,
        body: JSON.stringify(request),
      },
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          throw new HttpException(data.errors, HttpStatus.BAD_REQUEST);
        }
        return data;
      })
      .catch((error) => {
        throw new HttpException(
          {
            error: 'Check your request body or params',
            mambuError: error.response,
          },
          HttpStatus.BAD_REQUEST,
          { cause: new Error() },
        );
      });
  }
}
