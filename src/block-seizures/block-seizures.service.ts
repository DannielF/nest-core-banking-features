import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HeaderService } from 'src/config/header/header.config';
import { CreateAccountChangeStateDto } from './dto/create-account-change-state.dto';
import { CreateBlockFundsDto } from './dto/create-block-funds.dto';
import { CreateSeizureFundsDto } from './dto/create-siezure-funds.dto';
import { ResponseBlockFunds } from './entities/response-block-funds.entity';

@Injectable()
export class BlockSeizureService {
  constructor(private readonly headerService: HeaderService) {}

  async blockFunds(
    id: string,
    createBlockSeizureDto: CreateBlockFundsDto,
  ): Promise<ResponseBlockFunds> {
    return await fetch(`${this.headerService.baseUrl}/deposits/${id}/blocks`, {
      method: 'POST',
      headers: this.headerService.headers,
      body: JSON.stringify(createBlockSeizureDto),
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

  async seizureFunds(id: string, createBlockSeizureDto: CreateSeizureFundsDto) {
    return await fetch(
      `${this.headerService.baseUrl}/deposits/${id}/seizure-transactions`,
      {
        method: 'POST',
        headers: this.headerService.headers,
        body: JSON.stringify(createBlockSeizureDto),
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
            action: 'Check the data sent to the endpoint',
            mambuError: error.response,
          },
          HttpStatus.BAD_REQUEST,
          { cause: error },
        );
      });
  }

  async accountChangeState(
    id: string,
    createBlockSeizureDto: CreateAccountChangeStateDto,
  ) {
    return await fetch(
      `${this.headerService.baseUrl}/deposits/${id}:changeState`,
      {
        method: 'POST',
        headers: this.headerService.headers,
        body: JSON.stringify(createBlockSeizureDto),
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
            action: 'Check the data sent to the endpoint',
            mambuError: error.response,
          },
          HttpStatus.BAD_REQUEST,
          { cause: error },
        );
      });
  }

  async AllBlockFunds(id: string) {
    const { Accept, Authorization } = this.headerService.headers;
    return await fetch(`${this.headerService.baseUrl}/deposits/${id}/blocks`, {
      method: 'GET',
      headers: { Accept, Authorization },
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
}
