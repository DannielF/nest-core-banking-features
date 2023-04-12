import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { HeaderService } from 'src/config/header/header.config';

@Injectable()
export class AccountService {
  constructor(private readonly headerService: HeaderService) {}

  async createDeposit(createAccountDto: CreateAccountDto) {
    const response = await fetch(`${this.headerService.baseUrl}/deposits`, {
      method: 'POST',
      headers: this.headerService.headers,
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
    const { Accept, Authorization } = this.headerService.headers;
    const response = await fetch(
      `${this.headerService.baseUrl}/depositproducts/${id}?${queryParams}`,
      {
        method: 'GET',
        headers: { Accept, Authorization },
      },
    );
    return await response.json();
  }
}
