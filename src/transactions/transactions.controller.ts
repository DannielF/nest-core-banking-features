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
import { DisbursementLoanDto } from './dto/make-disbursement-loan.dto';

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

  @ApiOperation({ summary: 'Loan disbursement' })
  @ApiParam({ name: 'loanAccountId', type: 'string', required: true })
  @ApiBody({ type: DisbursementLoanDto })
  @Post('loan-disbursement/:loanAccountId')
  disbursementLoan(
    @Param('loanAccountId') id: string,
    @Body() body: DisbursementLoanDto,
  ) {
    return this.transactionsService.makeLoanDisbursement(id, body);
  }

  @ApiOperation({ summary: 'Search disbursement transactions' })
  @ApiBody({
    required: true,
    examples: {
      request: {
        value: {
          from: '2021-01-01',
          to: '2021-01-01',
          loanAccountKey: 'abc123',
        },
      },
    },
  })
  @Post('search-disbursements')
  searchDisbursementTransactions(
    @Body() body: { from: string; to: string; loanAccountKey: string },
  ) {
    return this.transactionsService.disbursementLoanTransactions(body);
  }

  @ApiOperation({ summary: 'Search payment transactions' })
  @ApiBody({
    required: true,
    examples: {
      request: {
        value: {
          from: '2021-01-01',
          to: '2021-01-01',
          loanAccountKey: 'abc123',
        },
      },
    },
  })
  @Post('search-payments')
  searchLoanTransactions(
    @Body() body: { from: string; to: string; loanAccountKey: string },
  ) {
    return this.transactionsService.paymentLoanTransactions(body);
  }

  @ApiOperation({ summary: 'Search loan account by id' })
  @ApiParam({ name: 'loanAccountId', type: 'string', required: true })
  @Get('loans/:loanAccountId')
  searchLoanAccount(@Param('loanAccountId') id: string) {
    return this.transactionsService.getLoanAccountById(id);
  }

  @ApiOperation({ summary: 'Paying off a loan' })
  @ApiBody({
    required: true,
    examples: {
      request: {
        value: {
          amount: 100,
          notes: 'string',
          loanAccountId: 'string',
        },
      },
    },
  })
  @Post('loans/pay-off')
  payOffLoan(
    @Body() body: { amount: number; notes: string; loanAccountId: string },
  ) {
    return this.transactionsService.payingOffLoan(body);
  }
}
