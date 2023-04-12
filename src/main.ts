import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';

import { config as swaggerConfig } from './config/swaggerConfig/swaggerConfig';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT || 3000);
  logger.log(`Application listening on port ${process.env.PORT}`);
}
bootstrap();
