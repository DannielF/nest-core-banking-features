import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HeaderService } from 'src/config/header/header.config';
import { CreateAccountDto } from './dto/create-account.dto';
import { ResponseCreateAccountEntity } from './entities/response-create-account.entity';
import { ResponseGetProductEntity } from './entities/response-get-product.entity';

@Injectable()
export class AccountService {
  constructor(private readonly headerService: HeaderService) {}

  async createDeposit(
    createAccountDto: CreateAccountDto,
  ): Promise<ResponseCreateAccountEntity> {
    return await fetch(`${this.headerService.baseUrl}/deposits`, {
      method: 'POST',
      headers: this.headerService.headers,
      body: JSON.stringify(createAccountDto),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.errors) {
          throw new HttpException(response.errors, HttpStatus.BAD_REQUEST);
        }
        return response;
      })
      .catch((error) => {
        throw new HttpException(
          {
            action: 'Check the data sent to the endpoint',
            mambuError: error.response,
          },
          HttpStatus.BAD_REQUEST,
          { cause: error },
        );
      });
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
    return await fetch(
      `${this.headerService.baseUrl}/depositproducts/${Idproduct}?${queryParams}`,
      {
        method: 'GET',
        headers: { Accept, Authorization },
      },
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.errors) {
          throw new HttpException(response.errors, HttpStatus.BAD_REQUEST);
        }
        return response;
      })
      .catch((error) => {
        throw new HttpException(
          {
            action: 'Check the params sent to the endpoint',
            mambuError: error.response,
          },
          HttpStatus.BAD_REQUEST,
          { cause: error },
        );
      });
  }
}
