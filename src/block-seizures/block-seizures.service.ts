import { Injectable } from '@nestjs/common';
import { CreateBlockFundsDto } from './dto/create-block-funds.dto';
import { HeaderConfig } from 'src/config/header.config';
import { CreateSeizureFundsDto } from './dto/create-siezure-funds.dto';

@Injectable()
export class BlockSeizureService {
  constructor(private readonly headerService: HeaderConfig) {}

  async blockFunds(id: string, createBlockSeizureDto: CreateBlockFundsDto) {
    const response = await fetch(
      `${this.headerService.url}/deposits/${id}/blocks`,
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
      `${this.headerService.url}/deposits/${id}/seizure-transactions`,
      {
        method: 'POST',
        headers: this.headerService.headers,
        body: JSON.stringify(createBlockSeizureDto),
      },
    );
    return await response.json();
  }

  findAll() {
    return `This action returns all blockSeizures`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blockSeizure`;
  }

  update(id: number, updateBlockSeizureDto) {
    return `This action updates a #${id} blockSeizure`;
  }

  remove(id: number) {
    return `This action removes a #${id} blockSeizure`;
  }
}