import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { CreateWithdrawDto } from './dto/create-withdraw.dto';
import { SearchFilterDTO } from './dto/create-search-filter.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('deposit/:depositAccountId')
  deposit(
    @Param('depositAccountId') id: string,
    @Body() createTransactionDto: CreateDepositDto,
  ) {
    return this.transactionsService.makeDeposit(id, createTransactionDto);
  }

  @Post('withdraw/:depositAccountId')
  withdraw(
    @Param('depositAccountId') id: string,
    @Body() createTransactionDto: CreateWithdrawDto,
  ) {
    return this.transactionsService.makeWithdraw(id, createTransactionDto);
  }

  @Post('search-deposits')
  depositSearch(@Body() createTransactionDto: SearchFilterDTO) {
    return this.transactionsService.searchDeposits(createTransactionDto);
  }

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

  @Get('all/:depositAccountId')
  allTransactionClient(@Param('depositAccountId') id: string) {
    return this.transactionsService.transactionsClient(id);
  }
}
