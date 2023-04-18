import { ApiProperty } from '@nestjs/swagger';

class Personalizados {
  @ApiProperty({ example: 'UUID' })
  External_ID: string;
}
export class CreateClientDto {
  @ApiProperty({ example: 'John' })
  firstName: string;
  @ApiProperty({ example: 'Doe' })
  lastName: string;
  @ApiProperty({ example: '1234567' })
  phoneNumber?: string;
  @ApiProperty({ example: '1234567' })
  documentId: string;
  @ApiProperty({ example: 'email@email.com' })
  email: string;
  @ApiProperty({ example: 'Male/Female' })
  gender: string;
  @ApiProperty({ example: 'cll 1 # 1 - 1' })
  address?: string;
  @ApiProperty({ example: 'SPANISH' })
  preferredLanguage?: string;
  @ApiProperty({ type: Personalizados })
  _personalizados: Personalizados;
}
