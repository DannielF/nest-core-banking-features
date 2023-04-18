import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BlockSeizureService } from './block-seizures.service';
import { CreateBlockFundsDto } from './dto/create-block-funds.dto';
import { CreateSeizureFundsDto } from './dto/create-siezure-funds.dto';
import { CreateAccountChangeStateDto } from './dto/create-account-change-state.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Block-seizures')
@Controller('block-seizures')
export class BlockSeizuresController {
  constructor(private readonly blockSeizureService: BlockSeizureService) {}

  @ApiOperation({ summary: 'Block funds' })
  @ApiParam({ name: 'depositAccountId', type: 'string', required: true })
  @ApiBody({ type: CreateBlockFundsDto, required: true })
  @Post('blocks/:depositAccountId')
  blocks(
    @Param('depositAccountId') id: string,
    @Body() createBlockSeizureDto: CreateBlockFundsDto,
  ) {
    return this.blockSeizureService.blockFunds(id, createBlockSeizureDto);
  }

  @ApiOperation({ summary: 'Seizure funds' })
  @ApiParam({ name: 'depositAccountId', type: 'string', required: true })
  @ApiBody({ type: CreateSeizureFundsDto, required: true })
  @Post('seizures/:depositAccountId')
  seizure(
    @Param('depositAccountId') id: string,
    @Body() createBlockSeizureDto: CreateSeizureFundsDto,
  ) {
    return this.blockSeizureService.seizureFunds(id, createBlockSeizureDto);
  }

  @ApiOperation({ summary: 'Change state account' })
  @ApiParam({ name: 'depositAccountId', type: 'string', required: true })
  @ApiBody({ type: CreateAccountChangeStateDto, required: true })
  @Post('change-state/:depositAccountId')
  changeState(
    @Param('depositAccountId') id: string,
    @Body() createBlockSeizureDto: CreateAccountChangeStateDto,
  ) {
    return this.blockSeizureService.accountChangeState(
      id,
      createBlockSeizureDto,
    );
  }

  @ApiOperation({ summary: 'Get all blocks funds' })
  @ApiParam({ name: 'depositAccountId', type: 'string', required: true })
  @Get('all-blocks/:depositAccountId')
  getAllBlocksFunds(@Param('depositAccountId') id: string) {
    return this.blockSeizureService.AllBlockFunds(id);
  }
}
