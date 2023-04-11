import { Injectable } from '@nestjs/common';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { HeaderConfig } from 'src/config/header.config';
import { CreateWithdrawDto } from './dto/create-withdraw.dto';
import { SearchFilterDTO } from './dto/create-search-filter.dto';

@Injectable()
export class TransactionsService {
  constructor(private readonly headerService: HeaderConfig) {}

  async makeDeposit(id: string, createTransactionDto: CreateDepositDto) {
    const response = await fetch(
      `${this.headerService.url}/deposits/${id}/deposit-transactions`,
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
      `${this.headerService.url}/deposits/${id}/withdrawal-transactions`,
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
      `${this.headerService.url}/deposits/${id}/transactions`,
      {
        method: 'GET',
        headers: { Accept, Authorization },
      },
    );
    return await response.json();
  }

  async searchDeposits(createTransactionDto: SearchFilterDTO) {
    const { Accept, Authorization } = this.headerService.headers;
    const response = await fetch(`${this.headerService.url}/deposits/search`, {
      method: 'POST',
      headers: { Accept, Authorization, 'Content-Type': 'application/json' },
      body: JSON.stringify(createTransactionDto),
    });
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
      offset,
      limit,
      paginationDetails,
      detailsLevel,
    }).toString();

    const { Accept, Authorization } = this.headerService.headers;
    const response = await fetch(
      `${this.headerService.url}/deposits/transactions:search?${queryParams}`,
      {
        method: 'POST',
        headers: { Accept, Authorization, 'Content-Type': 'application/json' },
        body: JSON.stringify(createTransactionDto),
      },
    );
    return await response.json();
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
