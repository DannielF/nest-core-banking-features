import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';

@Injectable()
export class HeaderService {
  constructor(private readonly configService: ConfigService) {}

  get headers() {
    const user = this.configService.get('user');
    const password = this.configService.get('password');
    const authString = Buffer.from(`${user}:${password}`).toString('base64');

    return {
      'Content-Type': 'application/json',
      Authorization: `Basic ${authString}`,
      Accept: 'application/vnd.mambu.v2+json',
      idempotency_key: randomUUID(),
    };
  }

  get baseUrl() {
    return this.configService.get<string>('url');
  }
}
