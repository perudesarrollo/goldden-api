import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AutocompleteSellerUseCase } from '../application/autocomplete-seller.use-case';

@Controller('v1/seller/autocomplete')
export class SellerController {
  constructor(
    private readonly autocompleteSellerUseCase: AutocompleteSellerUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar clientes con filtros' })
  @ApiResponse({ status: 200, description: 'Lista de clientes' })
  @HttpCode(HttpStatus.OK)
  async getAutocompleteClients(@Query('query') query: string) {
    const result = await this.autocompleteSellerUseCase.execute(query);
    return {
      message: 'Listado de clientes obtenido exitosamente',
      ...result,
    };
  }
}
