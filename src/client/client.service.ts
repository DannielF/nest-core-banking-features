import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';

@Injectable()
export class ClientService {
  constructor(private readonly configService: ConfigService) {}

  private user = this.configService.get<string>('user');
  private password = this.configService.get<string>('password');
  private url = this.configService.get<string>('url');
  private authString = Buffer.from(`${this.user}:${this.password}`).toString(
    'base64',
  );

  private headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${this.authString}`,
    Accept: 'application/vnd.mambu.v2+json',
    idempotency_key: randomUUID(),
  };

  async create(createClientDto: CreateClientDto) {
    const response = await fetch(`${this.url}/clients/`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(createClientDto),
    });
    return await response.json();
  }

  findAll() {
    return `This action returns all client`;
  }

  async findOne(id: string) {
    const { Accept, Authorization } = this.headers;
    const response = await fetch(`${this.url}/clients/${id}`, {
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
