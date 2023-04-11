import { Injectable } from '@nestjs/common';
import { CreateApplyInterest } from './dto/create-fee-interest.dto';
import { HeaderService } from 'src/config/header.config';
import { CreateInterestAccrualDto } from './dto/create-interest-accrual.dto';

@Injectable()
export class FeeInterestService {
  async forceApplyInterest(
    id: string,
    createFeeInterestDto: CreateApplyInterest,
  ) {
    const response = await fetch(
      `${HeaderService.config.baseUrl}/deposits/${id}:applyInterest`,
      {
        method: 'POST',
        headers: HeaderService.config.headers,
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
    const { Accept, Authorization } = HeaderService.config.headers;
    const response = await fetch(
      `${HeaderService.config.baseUrl}/accounting/interestaccrual:search?${queryParams}`,
      {
        method: 'POST',
        headers: { Accept, Authorization, 'Content-type': 'application/json' },
        body: JSON.stringify(createFeeInterestDto),
      },
    );
    return response.json();
  }
}
