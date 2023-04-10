import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './clients/client.module';
import { EnvConfig as configuration } from './config/env.config';
import { AccountModule } from './accounts/account.module';
import { TransactionsModule } from './transactions/transactions.module';
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
    TransactionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
