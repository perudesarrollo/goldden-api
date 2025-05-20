import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ListQuotesDto } from '../interfaces/list-quotes.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ListQuoteUseCase } from '../application/get-quotes.use-case';

@Controller('v1/quotes')
export class QuotesController {
  constructor(private readonly getQuotesUseCase: ListQuoteUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Listar cotizaciones con filtros y paginación' })
  @ApiResponse({ status: 200, description: 'Lista de cotizaciones' })
  @HttpCode(HttpStatus.OK)
  async listQuotes(@Query() filters: ListQuotesDto) {
    const result = await this.getQuotesUseCase.execute(filters);
    return {
      message: 'Cotizaciones listadas exitosamente',
      ...result,
    };
  }
}
