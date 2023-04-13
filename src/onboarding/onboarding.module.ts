import { Module } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { OnboardingController } from './onboarding.controller';
import { HeaderModule } from 'src/config/header/header.module';
import { ClientModule } from 'src/clients/client.module';
import { AccountModule } from 'src/accounts/account.module';

@Module({
  controllers: [OnboardingController],
  providers: [OnboardingService],
  imports: [ClientModule, AccountModule, HeaderModule],
})
export class OnboardingModule {}
