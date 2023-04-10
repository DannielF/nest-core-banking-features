import { Module } from '@nestjs/common';
import { FeeInterestService } from './fee-interest.service';
import { FeeInterestController } from './fee-interest.controller';

@Module({
  controllers: [FeeInterestController],
  providers: [FeeInterestService]
})
export class FeeInterestModule {}
