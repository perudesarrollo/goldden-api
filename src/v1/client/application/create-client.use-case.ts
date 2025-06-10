import { Injectable } from '@nestjs/common';
import { ClientService } from '../infrastructure/client/client.service';
import { CreateClientDto } from '../interfaces/create-client.dto';

@Injectable()
export class SaveClientUseCase {
  constructor(private readonly clientService: ClientService) {}

  async execute(data: CreateClientDto) {
    return await this.clientService.createClient(data);
  }
}
