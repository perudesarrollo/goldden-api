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
import { AutocompleteVehicleUseCase } from '../application/autocomplete-vehicle.use-case';
import { CreateVehicleDto } from '../interfaces/create-vehicle.dto';
import { SaveVehicleUseCase } from '../application/create-vehicle.use-case';

@Controller('v1/vehicles')
export class VehicleController {
  constructor(
    private readonly autocompleteVehicleUseCase: AutocompleteVehicleUseCase,
    private readonly saveVehicleUseCase: SaveVehicleUseCase,
  ) {}

  @Get('/autocomplete')
  @ApiOperation({ summary: 'Listar vehículos con filtros' })
  @ApiResponse({ status: 200, description: 'Lista de vehículos' })
  @HttpCode(HttpStatus.OK)
  async getAutocompleteVehicles(@Query('query') query: string) {
    const result = await this.autocompleteVehicleUseCase.execute(query);
    return {
      message: 'Listado de vehículos obtenido exitosamente',
      ...result,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registrar un nuevo vehículo' })
  @ApiBody({ type: CreateVehicleDto })
  async saveVehicle(@Body() input: CreateVehicleDto) {
    const result = await this.saveVehicleUseCase.execute(input);
    return {
      message: 'Vehículo creado exitosamente',
      ...result,
    };
  }
}
