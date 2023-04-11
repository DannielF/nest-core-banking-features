import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';

@Injectable()
export class HeaderService {
  static config: HeaderService;

  constructor(private readonly configService: ConfigService) {
    HeaderService.config = this;
  }

  user = this.configService.get<string>('user');
  password = this.configService.get<string>('password');
  url = this.configService.get<string>('url');
  authString = Buffer.from(`${this.user}:${this.password}`).toString('base64');

  get headers() {
    return {
      'Content-Type': 'application/json',
      Authorization: `Basic ${this.authString}`,
      Accept: 'application/vnd.mambu.v2+json',
      idempotency_key: randomUUID(),
    };
  }

  get baseUrl() {
    return this.url;
  }
}
