import { Module } from '@nestjs/common';
import { FeeInterestService } from './fee-interest.service';
import { FeeInterestController } from './fee-interest.controller';
import { HeaderConfig } from 'src/config/header.config';

@Module({
  controllers: [FeeInterestController],
  providers: [FeeInterestService],
  imports: [HeaderConfig],
})
export class FeeInterestModule {}
