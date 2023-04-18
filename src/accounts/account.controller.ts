import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseGetProductEntity } from './entities/response-get-product.entity';
import { ResponseCreateAccountEntity } from './entities/response-create-account.entity';

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
  deposit(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.createDeposit(createAccountDto);
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
  depositProducts(
    @Param('Idproduct') id: string,
    @Query('offset') offset?: string,
    @Query('limit') limit?: string,
    @Query('paginationDetails') paginationDetails?: string,
    @Query('detailsLevel') detailsLevel?: string,
  ) {
    return this.accountService.getEcodedProduct(
      id,
      offset,
      limit,
      paginationDetails,
      detailsLevel,
    );
  }
}
