import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('deposits')
  deposit(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.createDeposit(createAccountDto);
  }

  @Get('get-ecoded/:Idproducto')
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
