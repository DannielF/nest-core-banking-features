import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';

export class HeaderConfig {
  constructor(private readonly configService: ConfigService) {
    this.user = this.configService.get<string>('user');
    this.password = this.configService.get<string>('password');
    this.url = this.configService.get<string>('url');
    this.authString = Buffer.from(`${this.user}:${this.password}`).toString(
      'base64',
    );
  }

  user: string;
  password: string;
  url: string;
  authString: string;

  getHeaders() {
    return {
      'Content-Type': 'application/json',
      Authorization: `Basic ${this.authString}`,
      Accept: 'application/vnd.mambu.v2+json',
      idempotency_key: randomUUID(),
    };
  }
}
