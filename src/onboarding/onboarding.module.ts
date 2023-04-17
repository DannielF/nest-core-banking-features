import { Module } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { OnboardingController } from './onboarding.controller';
import { ClientModule } from 'src/clients/client.module';
import { AccountModule } from 'src/accounts/account.module';
import { TransactionsModule } from 'src/transactions/transactions.module';
import { BlockSeizuresModule } from 'src/block-seizures/block-seizures.module';
import { HeaderModule } from 'src/config/header/header.module';

@Module({
  controllers: [OnboardingController],
  providers: [OnboardingService],
  imports: [
    ClientModule,
    AccountModule,
    TransactionsModule,
    BlockSeizuresModule,
    HeaderModule,
  ],
})
export class OnboardingModule {}
