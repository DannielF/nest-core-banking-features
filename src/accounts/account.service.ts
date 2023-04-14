import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { HeaderService } from 'src/config/header/header.config';
import { ResponseGetProductEntity } from './entities/response-get-product.entity';
import { ResponseCreateAccountEntity } from './entities/response-create-account.entity';

@Injectable()
export class AccountService {
  constructor(private readonly headerService: HeaderService) {}

  async createDeposit(
    createAccountDto: CreateAccountDto,
  ): Promise<ResponseCreateAccountEntity> {
    const response = await fetch(`${this.headerService.baseUrl}/deposits`, {
      method: 'POST',
      headers: this.headerService.headers,
      body: JSON.stringify(createAccountDto),
    });
    return await response.json();
  }

  async getEcodedProduct(
    Idproduct: string,
    offset?: string,
    limit?: string,
    paginationDetails?: string,
    detailsLevel?: string,
  ): Promise<ResponseGetProductEntity> {
    const queryParams = new URLSearchParams({
      offset: offset ?? '0',
      limit: limit ?? '10',
      paginationDetails: paginationDetails ?? 'OFF',
      detailsLevel: detailsLevel ?? 'FULL',
    }).toString();

    const { Accept, Authorization } = this.headerService.headers;
    const response = await fetch(
      `${this.headerService.baseUrl}/depositproducts/${Idproduct}?${queryParams}`,
      {
        method: 'GET',
        headers: { Accept, Authorization },
      },
    );
    return await response.json();
  }
}
