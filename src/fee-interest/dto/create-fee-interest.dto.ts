import { ApiProperty } from '@nestjs/swagger';

export class CreateApplyInterest {
  @ApiProperty({ example: '2020-01-01' })
  interestApplicationDate: string;
  @ApiProperty({ example: 'false' })
  isPaymentHolidaysInterest?: boolean;
  @ApiProperty({ example: 'lorem ipsup' })
  notes: string;
  @ApiProperty({ example: '10' })
  paymentHolidaysInterestAmount?: number;
}
