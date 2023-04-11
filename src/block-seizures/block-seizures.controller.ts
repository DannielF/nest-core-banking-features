import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BlockSeizureService } from './block-seizures.service';
import { CreateBlockFundsDto } from './dto/create-block-funds.dto';
import { CreateSeizureFundsDto } from './dto/create-siezure-funds.dto';
import { CreateAccountChangeStateDto } from './dto/create-account-change-state.dto';

@Controller('block-seizures')
export class BlockSeizuresController {
  constructor(private readonly blockSeizureService: BlockSeizureService) {}

  @Post('/blocks/:depositAccountId')
  blocks(
    @Param('depositAccountId') id: string,
    @Body() createBlockSeizureDto: CreateBlockFundsDto,
  ) {
    return this.blockSeizureService.blockFunds(id, createBlockSeizureDto);
  }

  @Post('/seizures/:depositAccountId')
  seizure(
    @Param('depositAccountId') id: string,
    @Body() createBlockSeizureDto: CreateSeizureFundsDto,
  ) {
    return this.blockSeizureService.seizureFunds(id, createBlockSeizureDto);
  }

  @Post('/change-state/:depositAccountId')
  changeState(
    @Param('depositAccountId') id: string,
    @Body() createBlockSeizureDto: CreateAccountChangeStateDto,
  ) {
    return this.blockSeizureService.accountChangeState(
      id,
      createBlockSeizureDto,
    );
  }

  @Get('/all-blocks/:depositAccountId')
  getAllBlocksFunds(@Param('depositAccountId') id: string) {
    return this.blockSeizureService.AllBlockFunds(id);
  }
}
