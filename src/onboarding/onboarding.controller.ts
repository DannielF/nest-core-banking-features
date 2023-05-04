import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { OnboardingClientDTO } from './dto/onboarding-client.dto';
import { OnboardingService } from './onboarding.service';
import { OnboardingLoanDTO } from './dto/onboarding-loan.dto';

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
  @ApiBody({ required: true, description: 'accountId' })
  @Post('pay-interest')
  payInterestAccrued(@Body() request: { accountId: string }) {
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

  @ApiOperation({ summary: 'Onboarding client and loan' })
  @ApiBody({ required: true, type: OnboardingLoanDTO })
  @Post('onboarding-loan')
  onboardingLoan(@Body() request: OnboardingLoanDTO) {
    return this.onboardingService.createClientAndLoan(request);
  }

  @ApiOperation({ summary: 'Approve a loan account' })
  @ApiBody({ required: true, description: 'loanAccountId' })
  @Post('approve-loan')
  approveLoan(@Body() request: { loanAccountId: string }) {
    return this.onboardingService.approveLoanAccount(request);
  }

  @ApiOperation({ summary: 'Disbursement a loan' })
  @ApiBody({ required: true, description: 'loanAccountId' })
  @Post('disbursement-loan')
  disbursementLoan(@Body() request: { loanAccountId: string }) {
    return this.onboardingService.disburseLoanAccount(request);
  }

  @ApiOperation({ summary: 'Block loan operation' })
  @ApiBody({
    required: true,
    examples: {
      request: {
        value: {
          operations: ['APPLY_INTEREST', 'APPLY_PENALTIES', 'APPLY_FEES'],
          loanAccountId: 'UUID',
        },
      },
    },
  })
  @Post('block-loan')
  blockLoan(@Body() request: { operations: string[]; loanAccountId: string }) {
    return this.onboardingService.blockLoanAccount(request);
  }
}
