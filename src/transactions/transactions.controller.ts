import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { CreateWithdrawDto } from './dto/create-withdraw.dto';
import { SearchFilterDTO } from './dto/create-search-filter.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @ApiOperation({ summary: 'Create deposit' })
  @ApiParam({ name: 'depositAccountId', type: 'string', required: true })
  @ApiBody({ type: CreateDepositDto, required: true })
  @Post('deposit/:depositAccountId')
  deposit(
    @Param('depositAccountId') id: string,
    @Body() createTransactionDto: CreateDepositDto,
  ) {
    return this.transactionsService.makeDeposit(id, createTransactionDto);
  }

  @ApiOperation({ summary: 'Create withdraw' })
  @ApiParam({ name: 'depositAccountId', type: 'string', required: true })
  @ApiBody({ type: CreateWithdrawDto, required: true })
  @Post('withdraw/:depositAccountId')
  withdraw(
    @Param('depositAccountId') id: string,
    @Body() createTransactionDto: CreateWithdrawDto,
  ) {
    return this.transactionsService.makeWithdraw(id, createTransactionDto);
  }

  @ApiOperation({ summary: 'Search deposits' })
  @ApiBody({ type: SearchFilterDTO, required: true })
  @Post('search-deposits')
  depositSearch(@Body() createTransactionDto: SearchFilterDTO) {
    return this.transactionsService.searchDeposits(createTransactionDto);
  }

  @ApiOperation({ summary: 'All transactions' })
  @ApiBody({ type: SearchFilterDTO, required: true })
  @ApiQuery({ name: 'offset', type: 'string', required: false })
  @ApiQuery({ name: 'limit', type: 'string', required: false })
  @ApiQuery({ name: 'paginationDetails', type: 'string', required: false })
  @ApiQuery({ name: 'detailsLevel', type: 'string', required: false })
  @Post('all')
  allTransactions(
    @Body() createTransactionDto: SearchFilterDTO,
    @Query('offset') offset?: string,
    @Query('limit') limit?: string,
    @Query('paginationDetails') paginationDetails?: string,
    @Query('detailsLevel') detailsLevel?: string,
  ) {
    return this.transactionsService.transactions(
      createTransactionDto,
      offset,
      limit,
      paginationDetails,
      detailsLevel,
    );
  }

  @ApiOperation({ summary: 'All transactions client' })
  @ApiParam({ name: 'depositAccountId', type: 'string', required: true })
  @ApiQuery({ name: 'offset', type: 'string', required: false })
  @ApiQuery({ name: 'limit', type: 'string', required: false })
  @ApiQuery({ name: 'paginationDetails', type: 'string', required: false })
  @ApiQuery({ name: 'detailsLevel', type: 'string', required: false })
  @Get('all/:depositAccountId')
  allTransactionClient(
    @Param('depositAccountId') depositAccountId: string,
    @Query('offset') offset?: string,
    @Query('limit') limit?: string,
    @Query('paginationDetails') paginationDetails?: string,
    @Query('detailsLevel') detailsLevel?: string,
  ) {
    return this.transactionsService.transactionsClient(
      depositAccountId,
      offset,
      limit,
      paginationDetails,
      detailsLevel,
    );
  }

  @ApiOperation({ summary: 'All loan installments' })
  @ApiParam({ name: 'loanAccountId', type: 'string', required: true })
  @Get('loan-installments/:loanAccountId')
  getLoanInstallments(@Param('loanAccountId') id: string) {
    return this.transactionsService.loanInstallments(id);
  }
}
