import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('Mambu implementation API')
  .setDescription('Client operations API')
  .setVersion('1.0')
  .build();
