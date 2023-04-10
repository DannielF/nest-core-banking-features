import { Module } from '@nestjs/common';
import { BlockSeizureService } from './block-seizures.service';
import { BlockSeizuresController } from './block-seizures.controller';

@Module({
  controllers: [BlockSeizuresController],
  providers: [BlockSeizureService],
})
export class BlockSeizuresModule {}
