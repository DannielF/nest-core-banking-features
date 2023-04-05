import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';

import { config } from './config/swaggerConfig/swaggerConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
