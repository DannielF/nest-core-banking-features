import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountChangeStateDto {
  @ApiProperty({ example: 'BLOCK' })
  action: string;
  @ApiProperty({ example: 'Lorem ipsup' })
  notes: string;
}
