import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { HeaderConfig } from 'src/config/header.config';

@Injectable()
export class AccountService {
  constructor(private readonly headerService: HeaderConfig) {}

  async createDeposit(createAccountDto: CreateAccountDto) {
    const response = await fetch(`${this.headerService.url}/deposits`, {
      method: 'POST',
      headers: this.headerService.getHeaders(),
      body: JSON.stringify(createAccountDto),
    });
    return await response.json();
  }

  async getEcodedProduct(
    id: string,
    offset?,
    limit?,
    paginationDetails?,
    detailsLevel?,
  ) {
    const queryParams = new URLSearchParams({
      offset: offset,
      limit: limit,
      paginationDetails: paginationDetails,
      detailsLevel: detailsLevel,
    }).toString();
    const { Accept, Authorization } = this.headerService.getHeaders();
    const response = await fetch(
      `${this.headerService.url}/depositproducts/${id}?${queryParams}`,
      {
        method: 'GET',
        headers: { Accept, Authorization },
      },
    );
    return await response.json();
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
