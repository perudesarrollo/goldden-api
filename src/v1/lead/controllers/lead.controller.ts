import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateLeadUseCase } from '../application/create-lead.use-case';
import { CreateLeadStep1Dto } from '../interfaces/create-lead-step-1.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ListLeadsDto } from '../interfaces/list-leads.dto';
import { ListLeadUseCase } from '../application/get-lead.use-case';
import { UpdateLeadDto } from '../interfaces/update-lead.dto';
import { UpdateLeadUseCase } from '../application/update-lead.use-case';

@Controller('v1/leads')
export class LeadController {
  constructor(
    private readonly createLeadUseCase: CreateLeadUseCase,
    private readonly listLeadUseCase: ListLeadUseCase,
    private readonly updateLeadUseCase: UpdateLeadUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo lead' })
  @HttpCode(HttpStatus.CREATED)
  async createLead(@Body() dto: CreateLeadStep1Dto) {
    const result = await this.createLeadUseCase.execute(dto);
    return {
      message: 'Lead creado exitosamente',
      data: result,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Listar leads con paginación y filtros' })
  @ApiResponse({
    status: 200,
    description: 'Leads encontrados',
    type: [CreateLeadStep1Dto],
  })
  @HttpCode(HttpStatus.OK)
  async listLeads(@Query() filters: ListLeadsDto) {
    const result = await this.listLeadUseCase.execute(filters);
    return {
      message: 'Leads listados exitosamente',
      ...result,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un lead existente' })
  @HttpCode(HttpStatus.OK)
  async updateLead(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateLeadDto,
  ) {
    return await this.updateLeadUseCase.execute(id, body);
  }
}
