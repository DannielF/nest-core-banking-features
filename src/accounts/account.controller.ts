import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorResponse } from 'src/common/models/error-response.entity';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { ResponseCreateAccountEntity } from './entities/response-create-account.entity';
import { ResponseGetProductEntity } from './entities/response-get-product.entity';

@ApiTags('Accounts')
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiOperation({ summary: 'Create a savings account' })
  @ApiResponse({
    status: 201,
    description: 'The account has been successfully created.',
    type: ResponseCreateAccountEntity,
  })
  @ApiBody({ type: CreateAccountDto, required: true })
  @Post('deposits')
  async deposit(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService
      .createDeposit(createAccountDto)
      .then((response) => {
        if (response.id === undefined) {
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

  @ApiOperation({ summary: 'Get ecoded for a product' })
  @ApiResponse({
    status: 200,
    description: 'The ecoded for a product',
    type: ResponseGetProductEntity,
  })
  @ApiParam({ name: 'Idproduct', type: 'string', required: true })
  @ApiQuery({ name: 'offset', type: 'string', required: false })
  @ApiQuery({ name: 'limit', type: 'string', required: false })
  @ApiQuery({ name: 'paginationDetails', type: 'string', required: false })
  @ApiQuery({ name: 'detailsLevel', type: 'string', required: false })
  @Get('get-ecoded/:Idproduct')
  async depositProducts(
    @Param('Idproduct') id: string,
    @Query('offset') offset?: string,
    @Query('limit') limit?: string,
    @Query('paginationDetails') paginationDetails?: string,
    @Query('detailsLevel') detailsLevel?: string,
  ) {
    return await this.accountService
      .getEcodedProduct(id, offset, limit, paginationDetails, detailsLevel)
      .then((response) => {
        if (response.encodedKey === undefined) {
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
            source: errorMambu.errors[0].errorSource,
          },
          HttpStatus.BAD_REQUEST,
          {
            cause: error,
          },
        );
      });
  }
}
