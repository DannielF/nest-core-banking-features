import { Module } from '@nestjs/common';
import { BlockSeizureService } from './block-seizures.service';
import { BlockSeizuresController } from './block-seizures.controller';
import { HeaderConfig } from 'src/config/header.config';

@Module({
  controllers: [BlockSeizuresController],
  providers: [BlockSeizureService],
  imports: [HeaderConfig],
})
export class BlockSeizuresModule {}
