import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { HeaderModule } from 'src/config/header/header.module';

@Module({
  controllers: [ClientController],
  providers: [ClientService],
  imports: [HeaderModule],
  exports: [ClientService],
})
export class ClientModule {}
