import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FeeInterestService } from './fee-interest.service';
import { CreateApplyInterest } from './dto/create-fee-interest.dto';
import { CreateInterestAccrualDto } from './dto/create-interest-accrual.dto';

@Controller('fee-interest')
export class FeeInterestController {
  constructor(private readonly feeInterestService: FeeInterestService) {}

  @Post('deposits')
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feeInterestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeeInterestDto) {
    return this.feeInterestService.update(+id, updateFeeInterestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feeInterestService.remove(+id);
  }
}
