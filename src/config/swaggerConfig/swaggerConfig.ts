import { DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('Core banking API')
  .setDescription('Standard operations for core banking')
  .setVersion('1.0')
  .setLicense('MIT', 'https://opensource.org/licenses/MIT')
  .build();

export const options: SwaggerDocumentOptions = {
  operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
};
