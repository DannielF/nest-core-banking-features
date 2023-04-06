import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';

export class HeaderConfig {
  constructor(private readonly configService: ConfigService) {}

  user = this.configService.get<string>('user');
  password = this.configService.get<string>('password');
  url = this.configService.get<string>('url');
  authString = Buffer.from(`${this.user}:${this.password}`).toString('base64');

  headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${this.authString}`,
    Accept: 'application/vnd.mambu.v2+json',
    idempotency_key: randomUUID(),
  };
}
