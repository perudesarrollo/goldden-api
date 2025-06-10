import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ListQuotesDto } from '../interfaces/list-quotes.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ListQuoteUseCase } from '../application/get-quotes.use-case';
import { CreateQuoteVehicularDto } from '../interfaces/create-quote.dto';
import { SaveQuoteUseCase } from '../application/create-quote.use-case';

@Controller('v1/quotes')
export class QuotesController {
  constructor(
    private readonly getQuotesUseCase: ListQuoteUseCase,
    private readonly saveQuoteUseCase: SaveQuoteUseCase,
  ) {}

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

  @Post()
  @ApiOperation({ summary: 'Crear una cotización vehicular' })
  @ApiResponse({ status: 201, description: 'Cotización creada exitosamente' })
  @ApiBody({ type: CreateQuoteVehicularDto })
  async saveQuote(@Body() input: CreateQuoteVehicularDto) {
    const result = await this.saveQuoteUseCase.execute(input);
    return {
      message: 'Cotización creada exitosamente',
      ...result,
    };
  }
}
