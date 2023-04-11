import { Injectable } from '@nestjs/common';
import { CreateBlockFundsDto } from './dto/create-block-funds.dto';
import { CreateSeizureFundsDto } from './dto/create-siezure-funds.dto';
import { CreateAccountChangeStateDto } from './dto/create-account-change-state.dto';
import { HeaderService } from 'src/config/header.config';

@Injectable()
export class BlockSeizureService {
  async blockFunds(id: string, createBlockSeizureDto: CreateBlockFundsDto) {
    const response = await fetch(
      `${HeaderService.config.url}/deposits/${id}/blocks`,
      {
        method: 'POST',
        headers: HeaderService.config.headers,
        body: JSON.stringify(createBlockSeizureDto),
      },
    );
    return await response.json();
  }

  async seizureFunds(id: string, createBlockSeizureDto: CreateSeizureFundsDto) {
    const response = await fetch(
      `${HeaderService.config.baseUrl}/deposits/${id}/seizure-transactions`,
      {
        method: 'POST',
        headers: HeaderService.config.headers,
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
      `${HeaderService.config.baseUrl}/deposits/${id}:changeState`,
      {
        method: 'POST',
        headers: HeaderService.config.headers,
        body: JSON.stringify(createBlockSeizureDto),
      },
    );
    return await response.json();
  }

  async AllBlockFunds(id: string) {
    const { Accept, Authorization } = HeaderService.config.headers;
    const response = await fetch(
      `${HeaderService.config.baseUrl}/deposits/${id}/blocks`,
      {
        method: 'GET',
        headers: { Accept, Authorization },
      },
    );
    return await response.json();
  }
}
