import { ApiProperty } from '@nestjs/swagger';

export class OnboardingClientDTO {
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
  @ApiProperty({ example: 'CLIENT' })
  holderType: string;
  @ApiProperty({ example: 'extraField: lorem ipsup' })
  _personalizados: Personalization;
}

class Personalization {
  @ApiProperty({ example: 'UUID' })
  External_ID: string;
}
