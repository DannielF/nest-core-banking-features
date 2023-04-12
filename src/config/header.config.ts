import { randomUUID } from 'crypto';

export class HeaderService {
  get headers() {
    const user = process.env.SANDBOX_USER;
    const password = process.env.SANDBOX_USER_PASSWORD;
    const authString = Buffer.from(`${user}:${password}`).toString('base64');

    return {
      'Content-Type': 'application/json',
      Authorization: `Basic ${authString}`,
      Accept: 'application/vnd.mambu.v2+json',
      idempotency_key: randomUUID(),
    };
  }

  get baseUrl() {
    return process.env.URL_MAMBU;
  }
}
