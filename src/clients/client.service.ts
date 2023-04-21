import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HeaderService } from 'src/config/header/header.config';
import { CreateClientDto } from './dto/create-client.dto';
import { ResponseCreateClient } from './entities/response-create-client.entity';

@Injectable()
export class ClientService {
  constructor(private readonly headerService: HeaderService) {}

  async create(
    createClientDto: CreateClientDto,
  ): Promise<ResponseCreateClient> {
    return await fetch(`${this.headerService.baseUrl}/clients/`, {
      method: 'POST',
      headers: this.headerService.headers,
      body: JSON.stringify(createClientDto),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.errors) {
          throw new HttpException(response.errors, HttpStatus.BAD_REQUEST);
        }
        return response;
      })
      .catch((error) => {
        throw new HttpException(
          {
            action: 'Check the data sent to the endpoint',
            mambuError: error.response,
          },
          HttpStatus.BAD_REQUEST,
          { cause: error },
        );
      });
  }

  async getClientById(id: string) {
    const { Accept, Authorization } = this.headerService.headers;
    return await fetch(`${this.headerService.baseUrl}/clients/${id}`, {
      method: 'GET',
      headers: { Accept, Authorization, 'Content-type': 'application/json' },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.errors) {
          throw new HttpException(response.errors, HttpStatus.BAD_REQUEST);
        }
        return response;
      })
      .catch((error) => {
        throw new HttpException(
          {
            mambuError: error.response,
          },
          HttpStatus.BAD_REQUEST,
          { cause: error },
        );
      });
  }
}
