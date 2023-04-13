import { Module } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { OnboardingController } from './onboarding.controller';
import { ClientService } from 'src/clients/client.service';
import { AccountService } from 'src/accounts/account.service';
import { HeaderModule } from 'src/config/header/header.module';

@Module({
  controllers: [OnboardingController],
  providers: [OnboardingService],
  imports: [ClientService, AccountService, HeaderModule],
})
export class OnboardingModule {}
