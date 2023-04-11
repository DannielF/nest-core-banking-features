import { Controller, Post, Body, Param, Query } from '@nestjs/common';
import { FeeInterestService } from './fee-interest.service';
import { CreateApplyInterest } from './dto/create-fee-interest.dto';
import { CreateInterestAccrualDto } from './dto/create-interest-accrual.dto';

@Controller('fee-interest')
export class FeeInterestController {
  constructor(private readonly feeInterestService: FeeInterestService) {}

  @Post('deposits/:depositAccountId')
  depositInterest(
    @Param('depositAccountId') id: string,
    @Body() createFeeInterestDto: CreateApplyInterest,
  ) {
    return this.feeInterestService.forceApplyInterest(id, createFeeInterestDto);
  }

  @Post('interest-accrual')
  interestAccrual(
    @Body() createFeeInterestDto: CreateInterestAccrualDto,
    @Query('offset') offset?: string,
    @Query('limit') limit?: string,
    @Query('paginationDetails') paginationDetails?: string,
    @Query('detailsLevel') detailsLevel?: string,
  ) {
    return this.feeInterestService.AllInterestAccrual(
      createFeeInterestDto,
      offset,
      limit,
      paginationDetails,
      detailsLevel,
    );
  }
}
