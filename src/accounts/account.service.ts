import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { HeaderService } from 'src/config/header.config';

@Injectable()
export class AccountService {
  async createDeposit(createAccountDto: CreateAccountDto) {
    const response = await fetch(`${HeaderService.config.baseUrl}/deposits`, {
      method: 'POST',
      headers: HeaderService.config.headers,
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
    const { Accept, Authorization } = HeaderService.config.headers;
    const response = await fetch(
      `${HeaderService.config.baseUrl}/depositproducts/${id}?${queryParams}`,
      {
        method: 'GET',
        headers: { Accept, Authorization },
      },
    );
    return await response.json();
  }
}
