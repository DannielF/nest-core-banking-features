import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    return await fetch(
      `${this.headerService.baseUrl}/deposits/${id}:applyInterest`,
      {
        method: 'POST',
        headers: this.headerService.headers,
        body: JSON.stringify(createFeeInterestDto),
      },
    )
      .then((response) => {
        if (response.status === 204) {
          return { message: 'Interest applied successfully' };
        }
        return response.json();
      })
      .then((response) => {
        if (response.errors) {
          throw new HttpException(response.errors, HttpStatus.BAD_REQUEST);
        }
        return response;
      })
      .catch((error) => {
        throw new HttpException(
          {
            mambuError: error.response,
          },
          HttpStatus.BAD_REQUEST,
          { cause: error },
        );
      });
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

    return await fetch(
      `${this.headerService.baseUrl}/accounting/interestaccrual:search?${queryParams}`,
      {
        method: 'POST',
        headers: { Accept, Authorization, 'Content-type': 'application/json' },
        body: JSON.stringify(createFeeInterestDto),
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
            mambuError: error.response,
          },
          HttpStatus.BAD_REQUEST,
          { cause: error },
        );
      });
  }

  async changeLoanInterestRate(body: {
    interest: number;
    notes: string;
    loanAccountId: string;
  }) {
    const currentDate: Date = new Date();
    const newDateTime: Date = new Date(currentDate.getTime() - 1 * 1000);
    const dateString: string = newDateTime
      .toISOString()
      .replace(/\.\d+Z$/, '-05:00');
    const request = {
      interestRate: body.interest,
      notes: body.notes,
      valueDate: dateString,
    };
    return await fetch(
      `${this.headerService.baseUrl}/loans/${body.loanAccountId}:changeInterestRate`,
      {
        method: 'POST',
        headers: this.headerService.headers,
        body: JSON.stringify(request),
      },
    )
      .then((response) => {
        if (response.status === 204) {
          return { message: 'Interest applied successfully' };
        }
        return response.json();
      })
      .then((response) => {
        if (response.errors) {
          throw new HttpException(response.errors, HttpStatus.BAD_REQUEST);
        }
        return response;
      })
      .catch((error) => {
        throw new HttpException(
          {
            mambuError: error.response,
          },
          HttpStatus.BAD_REQUEST,
          { cause: error },
        );
      });
  }
}
