import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetCiudadUseCase } from '../application/get-ciudad.use_case';
import { FiltersFindCitiesDto } from '../interfaces/find-cities/find-cities.interface';

@Controller('v1/ubigeo/ciudad')
export class CiudadController {
  constructor(private readonly getCiudadUseCase: GetCiudadUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Listar ciudades con filtros y paginación' })
  @ApiResponse({ status: 200, description: 'Lista de ciudades' })
  @HttpCode(HttpStatus.OK)
  async getCiudades(@Query() filters: FiltersFindCitiesDto) {
    const result = await this.getCiudadUseCase.execute(filters);
    return {
      message: 'Listado de ciudades obtenido exitosamente',
      ...result,
    };
  }

  @Get(':id')
  getCiudadById(id: string) {
    // Aquí iría la lógica para obtener una ciudad por ID
    return {
      message: `Ciudad con ID ${id} obtenida exitosamente`,
      data: { id, nombre: `Ciudad ${id}` },
    };
  }
}
