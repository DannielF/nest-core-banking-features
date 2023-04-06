import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { HeaderConfig } from 'src/config/header.config';

@Injectable()
export class AccountService {
  constructor(private readonly headerService: HeaderConfig) {}

  async create(createAccountDto: CreateAccountDto) {
    const response = await fetch(`${this.headerService.url}/deposits`, {
      method: 'POST',
      headers: this.headerService.headers,
      body: JSON.stringify(createAccountDto),
    });
    return await response.json();
  }

  findAll() {
    return `This action returns all account`;
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
