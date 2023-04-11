import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { HeaderService } from 'src/config/header.config';

@Injectable()
export class ClientService {
  async create(createClientDto: CreateClientDto) {
    const response = await fetch(`${HeaderService.config.baseUrl}/clients/`, {
      method: 'POST',
      headers: HeaderService.config.headers,
      body: JSON.stringify(createClientDto),
    });
    return await response.json();
  }

  async getClientById(id: string) {
    const { Accept, Authorization } = HeaderService.config.headers;
    const response = await fetch(
      `${HeaderService.config.baseUrl}/clients/${id}`,
      {
        method: 'GET',
        headers: { Accept, Authorization, 'Content-type': 'application/json' },
      },
    );
    return await response.json();
  }
}
