import { Module } from '@nestjs/common';
import { HeaderService } from './header.config';

@Module({
  providers: [HeaderService],
  exports: [HeaderService],
})
export class HeaderModule {}
