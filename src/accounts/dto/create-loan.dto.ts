import { ApiProperty } from '@nestjs/swagger';

class InterestSettings {
  interestRate: number;
  interestType: string;
}

class PenaltySettings {
  penaltyRate: number;
}

class ScheduleSettings {
  gracePeriod: number;
  repaymentInstallments: number;
}

export class CreateLoanDto {
  @ApiProperty({ example: 'encodedKey', description: 'Client id' })
  accountHolderKey: string;
  @ApiProperty({ example: 'CLIENT', description: 'Client type' })
  accountHolderType: string;
  @ApiProperty({ type: InterestSettings, description: 'Interest settings' })
  interestSettings: InterestSettings;
  @ApiProperty({ example: '1500000', description: 'Loan amount' })
  loanAmount: number;
  @ApiProperty({ example: 'UUID', description: 'Loan product key' })
  productTypeKey: string;
  @ApiProperty({ type: ScheduleSettings, description: 'Schedule settings' })
  scheduleSettings: ScheduleSettings;
  @ApiProperty({ type: PenaltySettings, description: 'Penalty settings' })
  penaltySettings: PenaltySettings;
}
