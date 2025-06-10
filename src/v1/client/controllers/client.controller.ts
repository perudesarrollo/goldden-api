import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AutocompleteClientUseCase } from '../application/autocomplete-client.use-case';
import { CreateClientDto } from '../interfaces/create-client.dto';
import { SaveClientUseCase } from '../application/create-client.use-case';

@Controller('v1/client')
export class ClientController {
  constructor(
    private readonly autocompleteClientUseCase: AutocompleteClientUseCase,
    private readonly saveClientUseCase: SaveClientUseCase,
  ) {}

  @Get('/autocomplete')
  @ApiOperation({ summary: 'Listar clientes con filtros' })
  @ApiResponse({ status: 200, description: 'Lista de clientes' })
  @HttpCode(HttpStatus.OK)
  async getAutocompleteClients(@Query('query') query: string) {
    const result = await this.autocompleteClientUseCase.execute(query);
    return {
      message: 'Listado de clientes obtenido exitosamente',
      ...result,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registrar un nuevo vehículo' })
  @ApiBody({ type: CreateClientDto })
  async saveClient(@Body() input: CreateClientDto) {
    const result = await this.saveClientUseCase.execute(input);
    return result;
  }
}
