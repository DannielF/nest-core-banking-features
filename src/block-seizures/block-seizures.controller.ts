import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ErrorResponse } from 'src/common/models/error-response.entity';
import { BlockSeizureService } from './block-seizures.service';
import { CreateAccountChangeStateDto } from './dto/create-account-change-state.dto';
import { CreateBlockFundsDto } from './dto/create-block-funds.dto';
import { CreateSeizureFundsDto } from './dto/create-siezure-funds.dto';

@ApiTags('Block-seizures')
@Controller('block-seizures')
export class BlockSeizuresController {
  constructor(private readonly blockSeizureService: BlockSeizureService) {}

  @ApiOperation({ summary: 'Block funds' })
  @ApiParam({ name: 'depositAccountId', type: 'string', required: true })
  @ApiBody({ type: CreateBlockFundsDto, required: true })
  @Post('blocks/:depositAccountId')
  async blocks(
    @Param('depositAccountId') id: string,
    @Body() createBlockSeizureDto: CreateBlockFundsDto,
  ) {
    return await this.blockSeizureService
      .blockFunds(id, createBlockSeizureDto)
      .then((response) => {
        if (response.accountKey === undefined) {
          throw new HttpException(response, HttpStatus.BAD_REQUEST);
        }
        return response;
      })
      .catch((error) => {
        const errorMambu: ErrorResponse = error.response;
        throw new HttpException(
          {
            status: errorMambu.errors[0].errorCode,
            message: errorMambu.errors[0].errorReason,
            source: errorMambu.errors.map((error) => error.errorSource),
          },
          HttpStatus.BAD_REQUEST,
          {
            cause: error,
          },
        );
      });
  }

  @ApiOperation({ summary: 'Seizure funds' })
  @ApiParam({ name: 'depositAccountId', type: 'string', required: true })
  @ApiBody({ type: CreateSeizureFundsDto, required: true })
  @Post('seizures/:depositAccountId')
  async seizure(
    @Param('depositAccountId') id: string,
    @Body() createBlockSeizureDto: CreateSeizureFundsDto,
  ) {
    return await this.blockSeizureService
      .seizureFunds(id, createBlockSeizureDto)
      .then((response) => {
        if (response.errors) {
          throw new HttpException(response, HttpStatus.BAD_REQUEST);
        }
        return response;
      })
      .catch((error) => {
        const errorMambu: ErrorResponse = error.response;
        throw new HttpException(
          {
            status: errorMambu.errors[0].errorCode,
            message: errorMambu.errors[0].errorReason,
            source: errorMambu.errors.map((error) => error.errorSource),
          },
          HttpStatus.BAD_REQUEST,
          {
            cause: error,
          },
        );
      });
  }

  @ApiOperation({ summary: 'Change state account' })
  @ApiParam({ name: 'depositAccountId', type: 'string', required: true })
  @ApiBody({ type: CreateAccountChangeStateDto, required: true })
  @Post('change-state/:depositAccountId')
  async changeState(
    @Param('depositAccountId') id: string,
    @Body() createBlockSeizureDto: CreateAccountChangeStateDto,
  ) {
    return await this.blockSeizureService
      .accountChangeState(id, createBlockSeizureDto)
      .then((response) => {
        if (response.errors) {
          throw new HttpException(response, HttpStatus.BAD_REQUEST);
        }
        return response;
      })
      .catch((error) => {
        const errorMambu: ErrorResponse = error.response;
        throw new HttpException(
          {
            status: errorMambu.errors[0].errorCode,
            message: errorMambu.errors[0].errorReason,
            source: errorMambu.errors.map((error) => error.errorSource),
          },
          HttpStatus.BAD_REQUEST,
          {
            cause: error,
          },
        );
      });
  }

  @ApiOperation({ summary: 'Get all blocks funds' })
  @ApiParam({ name: 'depositAccountId', type: 'string', required: true })
  @Get('all-blocks/:depositAccountId')
  async getAllBlocksFunds(@Param('depositAccountId') id: string) {
    return await this.blockSeizureService
      .AllBlockFunds(id)
      .then((response) => {
        if (response.errors) {
          throw new HttpException(response, HttpStatus.BAD_REQUEST);
        }
        return response;
      })
      .catch((error) => {
        const errorMambu: ErrorResponse = error.response;
        throw new HttpException(
          {
            status: errorMambu.errors[0].errorCode,
            message: errorMambu.errors[0].errorReason,
            source: errorMambu.errors.map((error) => error.errorSource),
          },
          HttpStatus.BAD_REQUEST,
          {
            cause: error,
          },
        );
      });
  }
}
