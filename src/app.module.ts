import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './client/client.module';
import { EnvConfig as configuration } from './config/env.config';
import { AccountModule } from './account/account.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/environment/.env`,
      load: [configuration],
      isGlobal: true,
      cache: true,
    }),
    ClientModule,
    AccountModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
