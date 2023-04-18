import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { OnboardingClientDTO } from './dto/onboarding-client.dto';
import { OnboardingService } from './onboarding.service';

@ApiTags('Standard')
@Controller('standard')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @ApiOperation({ summary: 'Get last transactions' })
  @ApiParam({ name: 'depositAccountId', type: 'string', required: true })
  @ApiParam({ name: 'limit', type: 'string', required: true })
  @Get('last-transactions/:depositAccountId/:limit')
  getLastTransactions(
    @Param('depositAccountId') depositAccountId: string,
    @Param('limit') limit: string,
  ) {
    return this.onboardingService.lastTransactions(depositAccountId, limit);
  }

  @ApiOperation({ summary: 'Create client and deposit account' })
  @ApiBody({ type: OnboardingClientDTO, required: true })
  @Post('onboarding')
  createClient(@Body() request: OnboardingClientDTO) {
    return this.onboardingService.createClient(request);
  }

  @ApiOperation({ summary: 'Block and seizure funds' })
  @ApiBody({ required: true, description: 'accountId, amount' })
  @Post('block-funds')
  blockFundsAccount(@Body() request: { accountId: string; amount: string }) {
    return this.onboardingService.blockFunds(request);
  }

  @ApiOperation({ summary: 'Pay interest accrued' })
  @ApiBody({ required: true, description: 'accountId, date' })
  @Post('pay-interest')
  payInterestAccrued(@Body() request: { accountId: string; date: string }) {
    return this.onboardingService.payInterestAccrued(request);
  }

  @ApiOperation({ summary: 'Change state account to BLOCK' })
  @ApiBody({ required: true, description: 'accountId' })
  @Post('block-account')
  blockAccount(@Body() request: { accountId: string }) {
    return this.onboardingService.blockAccount(request);
  }

  @ApiOperation({ summary: 'Make a deposit' })
  @ApiBody({ required: true, description: 'accountId, amount' })
  @Post('deposits')
  makeDeposit(@Body() request: { accountId: string; amount: string }) {
    return this.onboardingService.depositAccount(request);
  }

  @ApiOperation({ summary: 'Make a withdraw' })
  @ApiBody({ required: true, description: 'accountId, amount' })
  @Post('withdraw')
  makeWithdraw(@Body() request: { accountId: string; amount: string }) {
    return this.onboardingService.withdrawAccount(request);
  }
}
