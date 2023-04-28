import { Body, Controller, Param, Post, Query } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateApplyInterest } from './dto/create-fee-interest.dto';
import { CreateInterestAccrualDto } from './dto/create-interest-accrual.dto';
import { FeeInterestService } from './fee-interest.service';

@ApiTags('Fee-interest')
@Controller('fee-interest')
export class FeeInterestController {
  constructor(private readonly feeInterestService: FeeInterestService) {}

  @ApiOperation({ summary: 'Force apply interest' })
  @ApiParam({ name: 'depositAccountId', type: 'string', required: true })
  @ApiBody({ type: CreateApplyInterest, required: true })
  @Post('deposits/:depositAccountId')
  depositInterest(
    @Param('depositAccountId') id: string,
    @Body() createFeeInterestDto: CreateApplyInterest,
  ) {
    return this.feeInterestService.forceApplyInterest(id, createFeeInterestDto);
  }

  @ApiOperation({ summary: 'Get all interest accrual' })
  @ApiBody({ type: CreateInterestAccrualDto, required: true })
  @ApiQuery({ name: 'offset', type: 'string', required: false })
  @ApiQuery({ name: 'limit', type: 'string', required: false })
  @ApiQuery({ name: 'paginationDetails', type: 'string', required: false })
  @ApiQuery({ name: 'detailsLevel', type: 'string', required: false })
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
