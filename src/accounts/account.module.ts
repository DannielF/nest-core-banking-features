import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { HeaderModule } from 'src/config/header/header.module';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [HeaderModule],
})
export class AccountModule {}
