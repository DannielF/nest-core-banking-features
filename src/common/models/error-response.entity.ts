import { ApiProperty } from '@nestjs/swagger';

class Error {
  @ApiProperty({ example: 400 })
  errorCode: number;
  @ApiProperty({ example: 'Bad Request' })
  errorReason: string;
  @ApiProperty({ example: 'Invalid request body' })
  errorSource: string;
}

export class ErrorResponse {
  @ApiProperty({ type: [Error] })
  errors: Error[];
}
