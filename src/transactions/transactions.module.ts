import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { HeaderModule } from 'src/config/header/header.module';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
  imports: [HeaderModule],
  exports: [TransactionsService],
})
export class TransactionsModule {}
