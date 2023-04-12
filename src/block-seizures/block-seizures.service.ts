import { Injectable } from '@nestjs/common';
import { CreateBlockFundsDto } from './dto/create-block-funds.dto';
import { CreateSeizureFundsDto } from './dto/create-siezure-funds.dto';
import { CreateAccountChangeStateDto } from './dto/create-account-change-state.dto';
import { HeaderService } from 'src/config/header.config';

@Injectable()
export class BlockSeizureService {
  constructor(private readonly headerService: HeaderService) {}

  async blockFunds(id: string, createBlockSeizureDto: CreateBlockFundsDto) {
    const response = await fetch(
      `${this.headerService.baseUrl}/deposits/${id}/blocks`,
      {
        method: 'POST',
        headers: this.headerService.headers,
        body: JSON.stringify(createBlockSeizureDto),
      },
    );
    return await response.json();
  }

  async seizureFunds(id: string, createBlockSeizureDto: CreateSeizureFundsDto) {
    const response = await fetch(
      `${this.headerService.baseUrl}/deposits/${id}/seizure-transactions`,
      {
        method: 'POST',
        headers: this.headerService.headers,
        body: JSON.stringify(createBlockSeizureDto),
      },
    );
    return await response.json();
  }

  async accountChangeState(
    id: string,
    createBlockSeizureDto: CreateAccountChangeStateDto,
  ) {
    const response = await fetch(
      `${this.headerService.baseUrl}/deposits/${id}:changeState`,
      {
        method: 'POST',
        headers: this.headerService.headers,
        body: JSON.stringify(createBlockSeizureDto),
      },
    );
    return await response.json();
  }

  async AllBlockFunds(id: string) {
    const { Accept, Authorization } = this.headerService.headers;
    const response = await fetch(
      `${this.headerService.baseUrl}/deposits/${id}/blocks`,
      {
        method: 'GET',
        headers: { Accept, Authorization },
      },
    );
    return await response.json();
  }
}
