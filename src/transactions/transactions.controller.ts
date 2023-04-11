import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { CreateWithdrawDto } from './dto/create-withdraw.dto';
import { SearchFilterDTO } from './dto/create-search-filter.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('deposit')
  deposit(
    @Param('depositAccountId') id: string,
    @Body() createTransactionDto: CreateDepositDto,
  ) {
    return this.transactionsService.makeDeposit(id, createTransactionDto);
  }

  @Post('withdraw')
  withdraw(
    @Param('depositAccountId') id: string,
    @Body() createTransactionDto: CreateWithdrawDto,
  ) {
    return this.transactionsService.makeWithdraw(id, createTransactionDto);
  }

  @Post('search')
  depositSearch(@Body() createTransactionDto: SearchFilterDTO) {
    return this.transactionsService.searchDeposits(createTransactionDto);
  }

  @Get()
  allTransactionClients(@Param('depositAccountId') id: string) {
    return this.transactionsService.allTransactionClients(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionDto) {
    return this.transactionsService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
