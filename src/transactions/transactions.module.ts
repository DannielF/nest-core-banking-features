import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { HeaderConfig } from 'src/config/header.config';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
  imports: [HeaderConfig],
})
export class TransactionsModule {}
