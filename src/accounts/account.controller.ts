import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { ResponseCreateAccountEntity } from './entities/response-create-account.entity';
import { ResponseGetProductEntity } from './entities/response-get-product.entity';
import { CreateLoanDto } from './dto/create-loan.dto';
import { ResponseLoanCreated } from './entities/loan-created.entity';

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

  @ApiOperation({ summary: 'Create a loan account' })
  @ApiResponse({
    status: 201,
    description: 'The loan has been successfully created.',
    type: ResponseLoanCreated,
  })
  @ApiBody({ type: CreateLoanDto, required: true })
  @Post('loans')
  loan(@Body() createLoanDto: CreateLoanDto) {
    return this.accountService.createLoan(createLoanDto);
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

  @ApiOperation({ summary: 'Get loan product info' })
  @ApiParam({ name: 'loanProductId', type: 'string', required: true })
  @Get('loanproducts/:loanProductId')
  loanProductInfo(@Param('loanProductId') id: string) {
    return this.accountService.getLoanProductInfo(id);
  }

  @ApiOperation({ summary: 'Approve a loan' })
  @ApiParam({ name: 'loanAccountId', type: 'string', required: true })
  @Post('loans/:loanAccountId/approve')
  aproveLoan(@Param('loanAccountId') id: string) {
    return this.accountService.approveLoan(id);
  }

  @ApiOperation({ summary: 'Lock a loan' })
  @ApiBody({
    required: true,
    examples: {
      request: {
        value: {
          operations: ['APPLY_INTEREST', 'APPLY_PENALTIES', 'APPLY_FEES'],
          notes: 'notes',
          loanAccountId: 'loanAccountId',
        },
      },
    },
  })
  @Post('loans-lock')
  lockLoan(
    @Body()
    body: {
      operations: string[];
      notes: string;
      loanAccountId: string;
    },
  ) {
    return this.accountService.lockLoan(body);
  }

  @ApiOperation({ summary: 'Unlock a loan' })
  @ApiBody({
    required: true,
    examples: {
      request: {
        value: {
          notes: 'notes',
          loanAccountId: 'loanAccountId',
        },
      },
    },
  })
  @Post('loans-unlock')
  unlockLoan(
    @Body()
    body: {
      notes: string;
      loanAccountId: string;
    },
  ) {
    return this.accountService.unlockLoan(body);
  }
}
