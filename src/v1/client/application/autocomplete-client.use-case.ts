import { Injectable } from '@nestjs/common';
import {
  ClientService,
  ResponseAutocomplete,
} from '../infrastructure/client/client.service';

@Injectable()
export class AutocompleteClientUseCase {
  constructor(private readonly clientService: ClientService) {}

  async execute(query: string): Promise<ResponseAutocomplete<any>> {
    return await this.clientService.autocompleteClients(query);
  }
}
