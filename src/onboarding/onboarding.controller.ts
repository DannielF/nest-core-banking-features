import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { OnboardingClientDTO } from './dto/onboarding-client.dto';

@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Post('client')
  createClient(@Body() request: OnboardingClientDTO) {
    return this.onboardingService.createClient(request);
  }

  @Get('last-transactions/:depositAccountId/:limit')
  getLastTransactions(
    @Param('depositAccountId') depositAccountId: string,
    @Param('limit') limit: string,
  ) {
    return this.onboardingService.lastTransactions(depositAccountId, limit);
  }
}
