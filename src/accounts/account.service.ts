import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HeaderService } from 'src/config/header/header.config';
import { CreateAccountDto } from './dto/create-account.dto';
import { ResponseCreateAccountEntity } from './entities/response-create-account.entity';
import { ResponseGetProductEntity } from './entities/response-get-product.entity';
import { CreateLoanDto } from './dto/create-loan.dto';
import { ResponseLoanCreated } from './entities/loan-created.entity';
import { LoanProductInfo } from './entities/get-loanproduct-info.entity';

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

  async createLoan(createLoanDto: CreateLoanDto): Promise<ResponseLoanCreated> {
    return await fetch(`${this.headerService.baseUrl}/loans`, {
      method: 'POST',
      headers: this.headerService.headers,
      body: JSON.stringify(createLoanDto),
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

  async getLoanProductInfo(loanProductId: string): Promise<LoanProductInfo> {
    const { Accept, Authorization } = this.headerService.headers;
    return await fetch(
      `${this.headerService.baseUrl}/loanproducts/${loanProductId}?detailsLevel=FULL`,
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

  async approveLoan(loanAccountId: string) {
    const request = {
      action: 'APPROVE',
      notes: 'Loan approved by API',
    };

    return await fetch(
      `${this.headerService.baseUrl}/loans/${loanAccountId}:changeState`,
      {
        method: 'POST',
        headers: this.headerService.headers,
        body: JSON.stringify(request),
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
