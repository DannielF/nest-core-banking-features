import { ApiProperty } from '@nestjs/swagger';

class Personalization {
  @ApiProperty({ example: 'UUID' })
  External_ID: string;
}

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
  @ApiProperty({ type: Personalization })
  _personalizados: Personalization;
}
