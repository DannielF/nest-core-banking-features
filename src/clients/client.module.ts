import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { HeaderConfig } from 'src/config/header.config';

@Module({
  controllers: [ClientController],
  providers: [ClientService],
  imports: [HeaderConfig],
})
export class ClientModule {}
