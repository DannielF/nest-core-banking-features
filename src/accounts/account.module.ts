import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { HeaderConfig } from 'src/config/header.config';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [HeaderConfig],
})
export class AccountModule {}
