import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseGetProductEntity } from './entities/response-get-product.entity';
import { ResponseCreateAccountEntity } from './entities/response-create-account.entity';

@ApiTags('accounts')
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('deposits')
  @ApiOperation({ summary: 'Create a savings account' })
  @ApiResponse({
    status: 201,
    description: 'The account has been successfully created.',
    type: ResponseCreateAccountEntity,
  })
  deposit(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.createDeposit(createAccountDto);
  }

  @Get('get-ecoded/:Idproducto')
  @ApiOperation({ summary: 'Get ecoded for a product' })
  @ApiResponse({
    status: 200,
    description: 'The ecoded for a product',
    type: ResponseGetProductEntity,
  })
  depositProducts(
    @Param('Idproducto') id: string,
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
