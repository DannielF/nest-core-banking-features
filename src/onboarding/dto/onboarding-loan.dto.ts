import { ApiProperty } from '@nestjs/swagger';

class Personalization {
  External_ID: string;
}

export class OnboardingLoanDTO {
  @ApiProperty({ example: 'John' })
  firstName: string;
  @ApiProperty({ example: 'Doe' })
  lastName: string;
  @ApiProperty({ example: '123456789' })
  documentId: string;
  @ApiProperty({ example: 'email@email.com' })
  email: string;
  @ApiProperty({ example: 'Male/Female' })
  gender: string;
  @ApiProperty({ example: '123GV567' })
  idProduct: string;
  holderType: string;
  _personalizados: Personalization;
  @ApiProperty({ example: 10 })
  interestRate: number;
  @ApiProperty({ example: 1000000 })
  loanAmount: number;
  @ApiProperty({ example: 5 })
  gracePeriod: number;
  @ApiProperty({ example: 12 })
  repaymentInstallments: number;
  @ApiProperty({ example: 5 })
  penaltyRate: number;
}
