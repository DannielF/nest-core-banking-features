import { Injectable } from '@nestjs/common';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { CreateWithdrawDto } from './dto/create-withdraw.dto';
import { SearchFilterDTO } from './dto/create-search-filter.dto';
import { HeaderService } from 'src/config/header/header.config';

@Injectable()
export class TransactionsService {
  constructor(private readonly headerService: HeaderService) {}

  async makeDeposit(id: string, createTransactionDto: CreateDepositDto) {
    const response = await fetch(
      `${this.headerService.baseUrl}/deposits/${id}/deposit-transactions`,
      {
        method: 'POST',
        headers: this.headerService.headers,
        body: JSON.stringify(createTransactionDto),
      },
    );
    return await response.json();
  }

  async makeWithdraw(id: string, createTransactionDto: CreateWithdrawDto) {
    const response = await fetch(
      `${this.headerService.baseUrl}/deposits/${id}/withdrawal-transactions`,
      {
        method: 'POST',
        headers: this.headerService.headers,
        body: JSON.stringify(createTransactionDto),
      },
    );
    return await response.json();
  }

  async transactionsClient(id: string) {
    const { Accept, Authorization } = this.headerService.headers;
    const response = await fetch(
      `${this.headerService.baseUrl}/deposits/${id}/transactions`,
      {
        method: 'GET',
        headers: { Accept, Authorization },
      },
    );
    return await response.json();
  }

  async searchDeposits(createTransactionDto: SearchFilterDTO) {
    const { Accept, Authorization } = this.headerService.headers;
    const response = await fetch(
      `${this.headerService.baseUrl}/deposits/search`,
      {
        method: 'POST',
        headers: { Accept, Authorization, 'Content-Type': 'application/json' },
        body: JSON.stringify(createTransactionDto),
      },
    );
    return await response.json();
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
    const response = await fetch(
      `${this.headerService.baseUrl}/deposits/transactions:search?${queryParams}`,
      {
        method: 'POST',
        headers: { Accept, Authorization, 'Content-Type': 'application/json' },
        body: JSON.stringify(createTransactionDto),
      },
    );
    return await response.json();
  }
}
