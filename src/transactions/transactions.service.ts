import { Injectable } from '@nestjs/common';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { HeaderConfig } from 'src/config/header.config';
import { CreateWithdrawDto } from './dto/create-withdraw.dto';

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

  findAll() {
    return `This action returns all transactions`;
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
