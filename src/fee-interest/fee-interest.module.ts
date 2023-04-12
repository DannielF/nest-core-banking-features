import { Module } from '@nestjs/common';
import { FeeInterestService } from './fee-interest.service';
import { FeeInterestController } from './fee-interest.controller';
import { HeaderModule } from 'src/config/header/header.module';

@Module({
  controllers: [FeeInterestController],
  providers: [FeeInterestService],
  imports: [HeaderModule],
})
export class FeeInterestModule {}
