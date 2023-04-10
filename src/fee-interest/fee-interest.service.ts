import { Injectable } from '@nestjs/common';
import { CreateApplyInterest } from './dto/create-fee-interest.dto';
import { HeaderConfig } from 'src/config/header.config';
import { CreateInterestAccrualDto } from './dto/create-interest-accrual.dto';

@Injectable()
export class FeeInterestService {
  constructor(private readonly headerService: HeaderConfig) {}

  async forceApplyInterest(
    id: string,
    createFeeInterestDto: CreateApplyInterest,
  ) {
    const response = await fetch(
      `${this.headerService.url}/deposits/${id}:applyInterest`,
      {
        method: 'POST',
        headers: this.headerService.headers,
        body: JSON.stringify(createFeeInterestDto),
      },
    );
    return response.json();
  }

  async AllInterestAccrual(
    createFeeInterestDto: CreateInterestAccrualDto,
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
    const response = await fetch(
      `${this.headerService.url}/accounting/interestaccrual:search?${queryParams}`,
      {
        method: 'POST',
        headers: this.headerService.headers,
        body: JSON.stringify(createFeeInterestDto),
      },
    );
    return response.json();
  }

  findOne(id: number) {
    return `This action returns a #${id} feeInterest`;
  }

  update(id: number, updateFeeInterestDto) {
    return `This action updates a #${id} feeInterest`;
  }

  remove(id: number) {
    return `This action removes a #${id} feeInterest`;
  }
}
