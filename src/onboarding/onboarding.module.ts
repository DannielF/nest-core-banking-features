import { Module } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { OnboardingController } from './onboarding.controller';
import { ClientModule } from 'src/clients/client.module';
import { AccountModule } from 'src/accounts/account.module';
import { TransactionsModule } from 'src/transactions/transactions.module';

@Module({
  controllers: [OnboardingController],
  providers: [OnboardingService],
  imports: [ClientModule, AccountModule, TransactionsModule],
})
export class OnboardingModule {}
