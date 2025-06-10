import { Module } from '@nestjs/common';
import { ClientService } from './infrastructure/client/client.service';
import { ClientController } from './controllers/client.controller';
import { AutocompleteClientUseCase } from './application/autocomplete-client.use-case';
import { SaveClientUseCase } from './application/create-client.use-case';

@Module({
  controllers: [ClientController],
  providers: [ClientService, AutocompleteClientUseCase, SaveClientUseCase],
  exports: [ClientService],
})
export class ClientModule {}
