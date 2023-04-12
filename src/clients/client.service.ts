import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { HeaderService } from 'src/config/header/header.config';

@Injectable()
export class ClientService {
  constructor(private readonly headerService: HeaderService) {}

  async create(createClientDto: CreateClientDto) {
    const response = await fetch(`${this.headerService.baseUrl}/clients/`, {
      method: 'POST',
      headers: this.headerService.headers,
      body: JSON.stringify(createClientDto),
    });
    return await response.json();
  }

  async getClientById(id: string) {
    const { Accept, Authorization } = this.headerService.headers;
    const response = await fetch(
      `${this.headerService.baseUrl}/clients/${id}`,
      {
        method: 'GET',
        headers: { Accept, Authorization, 'Content-type': 'application/json' },
      },
    );
    return await response.json();
  }
}
