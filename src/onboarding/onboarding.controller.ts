import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OnboardingClientDTO } from './dto/onboarding-client.dto';
import { OnboardingService } from './onboarding.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Standard')
@Controller('standard')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Get('last-transactions/:depositAccountId/:limit')
  getLastTransactions(
    @Param('depositAccountId') depositAccountId: string,
    @Param('limit') limit: string,
  ) {
    return this.onboardingService.lastTransactions(depositAccountId, limit);
  }

  @Post('onboarding')
  createClient(@Body() request: OnboardingClientDTO) {
    return this.onboardingService.createClient(request);
  }

  @Post('block-funds')
  blockFundsAccount(@Body() request: { accountId: string; amount: string }) {
    return this.onboardingService.blockFunds(request);
  }

  @Post('pay-interest')
  payInterestAccrued(@Body() request: { accountId: string; date: string }) {
    return this.onboardingService.payInterestAccrued(request);
  }

  @Post('block-account')
  blockAccount(@Body() request: { accountId: string }) {
    return this.onboardingService.blockAccount(request);
  }

  @Post('deposits')
  makeDeposit(@Body() request: { accountId: string; amount: string }) {
    return this.onboardingService.depositAccount(request);
  }

  @Post('withdraw')
  makeWithdraw(@Body() request: { accountId: string; amount: string }) {
    return this.onboardingService.withdrawAccount(request);
  }
}
