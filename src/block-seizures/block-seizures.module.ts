import { Module } from '@nestjs/common';
import { BlockSeizureService } from './block-seizures.service';
import { BlockSeizuresController } from './block-seizures.controller';
import { HeaderModule } from 'src/config/header/header.module';

@Module({
  controllers: [BlockSeizuresController],
  providers: [BlockSeizureService],
  imports: [HeaderModule],
  exports: [BlockSeizureService],
})
export class BlockSeizuresModule {}
