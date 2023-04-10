import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { HeaderConfig } from 'src/config/header.config';

@Injectable()
export class ClientService {
  constructor(private readonly headerService: HeaderConfig) {}

  async create(createClientDto: CreateClientDto) {
    const response = await fetch(`${this.headerService.url}/clients/`, {
      method: 'POST',
      headers: this.headerService.headers,
      body: JSON.stringify(createClientDto),
    });
    return await response.json();
  }

  findAll() {
    return `This action returns all client`;
  }

  async findOne(id: string) {
    const { Accept, Authorization } = this.headerService.headers;
    const response = await fetch(`${this.headerService.url}/clients/${id}`, {
      method: 'GET',
      headers: { Accept, Authorization, 'Content-type': 'application/json' },
    });
    return await response.json();
  }

  update(id: string, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
