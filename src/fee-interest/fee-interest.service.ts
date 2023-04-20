import { Injectable } from '@nestjs/common';
import { HeaderService } from 'src/config/header/header.config';
import { CreateApplyInterest } from './dto/create-fee-interest.dto';
import { CreateInterestAccrualDto } from './dto/create-interest-accrual.dto';

@Injectable()
export class FeeInterestService {
  constructor(private readonly headerService: HeaderService) {}

  async forceApplyInterest(
    id: string,
    createFeeInterestDto: CreateApplyInterest,
  ) {
    const response = await fetch(
      `${this.headerService.baseUrl}/deposits/${id}:applyInterest`,
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
      offset: offset ?? '0',
      limit: limit ?? '10',
      paginationDetails: paginationDetails ?? 'OFF',
      detailsLevel: detailsLevel ?? 'FULL',
    }).toString();
    const { Accept, Authorization } = this.headerService.headers;
    const response = await fetch(
      `${this.headerService.baseUrl}/accounting/interestaccrual:search?${queryParams}`,
      {
        method: 'POST',
        headers: { Accept, Authorization, 'Content-type': 'application/json' },
        body: JSON.stringify(createFeeInterestDto),
      },
    );
    return response.json();
  }
}
