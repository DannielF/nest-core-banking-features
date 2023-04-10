import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BlockSeizureService } from './block-seizures.service';
import { CreateBlockFundsDto } from './dto/create-block-funds.dto';
import { CreateSeizureFundsDto } from './dto/create-siezure-funds.dto';

@Controller('block-seizures')
export class BlockSeizuresController {
  constructor(private readonly blockSeizureService: BlockSeizureService) {}

  @Post('blocks')
  blocks(
    @Param('depositAccountId') id: string,
    @Body() createBlockSeizureDto: CreateBlockFundsDto,
  ) {
    return this.blockSeizureService.blockFunds(id, createBlockSeizureDto);
  }

  @Post('seizures')
  seizure(
    @Param('depositAccountId') id: string,
    @Body() createBlockSeizureDto: CreateSeizureFundsDto,
  ) {
    return this.blockSeizureService.seizureFunds(id, createBlockSeizureDto);
  }

  @Get()
  findAll() {
    return this.blockSeizureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blockSeizureService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlockSeizureDto) {
    return this.blockSeizureService.update(+id, updateBlockSeizureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blockSeizureService.remove(+id);
  }
}
