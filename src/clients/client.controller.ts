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
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';

@ApiTags('Clients')
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiOperation({ summary: 'Create client' })
  @ApiBody({ type: CreateClientDto, required: true })
  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    return await this.clientService
      .create(createClientDto)
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
            source: errorMambu.errors.map((error) => error.errorSource),
          },
          HttpStatus.BAD_REQUEST,
          {
            cause: error,
          },
        );
      });
  }

  @ApiOperation({ summary: 'Get client by id' })
  @ApiParam({ name: 'id', type: 'string', required: true })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.clientService
      .getClientById(id)
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
