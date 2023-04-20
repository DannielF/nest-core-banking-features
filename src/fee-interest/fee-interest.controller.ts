import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
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
  async depositInterest(
    @Param('depositAccountId') id: string,
    @Body() createFeeInterestDto: CreateApplyInterest,
  ) {
    return await this.feeInterestService
      .forceApplyInterest(id, createFeeInterestDto)
      .then((response) => {
        if (response.errors) {
          throw new HttpException(response.errors, HttpStatus.BAD_REQUEST);
        }
        return response;
      })
      .catch((error) => {
        throw new HttpException(
          {
            error: 'Check your request body or params',
            mambuError: error.response,
          },
          HttpStatus.BAD_REQUEST,
          { cause: error },
        );
      });
  }

  @ApiOperation({ summary: 'Get all interest accrual' })
  @ApiBody({ type: CreateInterestAccrualDto, required: true })
  @ApiQuery({ name: 'offset', type: 'string', required: false })
  @ApiQuery({ name: 'limit', type: 'string', required: false })
  @ApiQuery({ name: 'paginationDetails', type: 'string', required: false })
  @ApiQuery({ name: 'detailsLevel', type: 'string', required: false })
  @Post('interest-accrual')
  async interestAccrual(
    @Body() createFeeInterestDto: CreateInterestAccrualDto,
    @Query('offset') offset?: string,
    @Query('limit') limit?: string,
    @Query('paginationDetails') paginationDetails?: string,
    @Query('detailsLevel') detailsLevel?: string,
  ) {
    return await this.feeInterestService
      .AllInterestAccrual(
        createFeeInterestDto,
        offset,
        limit,
        paginationDetails,
        detailsLevel,
      )
      .then((response) => {
        if (response.errors) {
          throw new HttpException(response.errors, HttpStatus.BAD_REQUEST);
        }
        return response;
      })
      .catch((error) => {
        throw new HttpException(
          {
            error: 'Check your request body or params',
            mambuError: error.response,
          },
          HttpStatus.BAD_REQUEST,
          { cause: error },
        );
      });
  }
}
