import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './client/client.module';
import { EnvConfig as configuration } from './config/env.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/environment/.env`,
      load: [configuration],
      isGlobal: true,
    }),
    ClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
