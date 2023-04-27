export class CreateLoan {
  accountHolderKey: string;
  accountHolderType: string;
  interestSettings: InterestSettings;
  loanAmount: number;
  productTypeKey: string;
  scheduleSettings: ScheduleSettings;
  penaltySettings: PenaltySettings;
}

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
