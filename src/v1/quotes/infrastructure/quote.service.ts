import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { ListQuotesDto } from '../interfaces/list-quotes.dto';
import { UpdateQuoteDto } from '../interfaces/update-quote.dto';
import {
  CreateQuoteVehicularDto,
  EstadoCotizacion,
  TipoSeguro,
} from '../interfaces/create-quote.dto';
import { QuoteFindRepository } from './quote-find.repository';

export interface PaginatedQuotes<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

@Injectable()
export class QuoteService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly quoteFindRepository: QuoteFindRepository,
  ) {}

  async findQuotes(filters: ListQuotesDto): Promise<PaginatedQuotes<unknown>> {
    return await this.quoteFindRepository.findQuotes(
      filters,
      filters.page,
      filters.limit,
    );
  }

  async updateQuote(id: number, data: UpdateQuoteDto) {
    const quote = await this.prisma.cotizacion.findUnique({ where: { id } });
    if (!quote) {
      throw new NotFoundException(`Cotización con ID ${id} no encontrada.`);
    }

    return this.prisma.cotizacion.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  async saveQuote(input: CreateQuoteVehicularDto) {
    const {
      leadId,
      vendedorId,
      clienteId,
      fechaExpiracion,
      renovacionAuto = false,
      cotizacionVehicular,
    } = input;

    if (!cotizacionVehicular || cotizacionVehicular.length === 0) {
      throw new Error('Debe enviar al menos un vehicular');
    }

    // Validar Lead si se proporciona
    if (leadId) {
      const lead = await this.prisma.persona.findUnique({
        where: { id: leadId },
      });
      if (!lead) {
        throw new Error(`Lead con ID ${leadId} no encontrado`);
      }
    }

    // Validar vehículos únicos por ID
    const vehiculoIds = cotizacionVehicular.map((v) => v.vehiculoId!);
    const vehiculos = await this.prisma.vehiculo.findMany({
      where: { id: { in: vehiculoIds } },
    });

    const vehiculoIdSet = new Set(vehiculos.map((v) => v.id));
    const vehiculosFaltantes = vehiculoIds.filter(
      (id) => !vehiculoIdSet.has(id),
    );

    if (vehiculosFaltantes.length > 0) {
      throw new Error(
        `Vehículos no encontrados: ${vehiculosFaltantes.join(', ')}`,
      );
    }

    // Crear cotización principal
    const cotizacion = await this.prisma.cotizacion.create({
      data: {
        tipo: TipoSeguro.VEHICULAR,
        estado: EstadoCotizacion.BORRADOR,
        fechaExpiracion: fechaExpiracion ?? new Date(),
        renovacionAuto,
        leadId: leadId ?? 0,
        vendedorId: vendedorId ?? 0,
        clienteId: clienteId ?? 0,
      },
    });

    // Crear cotizaciones vehiculares
    const cotizacionesVehiculares = await Promise.all(
      cotizacionVehicular.map((v) =>
        this.prisma.cotizacionVehicular.create({
          data: {
            cotizacionId: cotizacion.id,
            vehiculoId: v.vehiculoId!,
            aseguradoraId: v.aseguradoraId!,
            productoId: v.productoId!,
            valorAsegurado: v.valorAsegurado ?? 0,
            primaNeta: v.primaNeta ?? 0,
            primaTotal: v.primaTotal ?? 0,
            tasa: v.tasa ?? 0,
            vigente: true,
            coberturasSeleccionadas: v.coberturasSeleccionadas?.length
              ? {
                  create: v.coberturasSeleccionadas.map((coberturaId) => ({
                    coberturaSeguroId: coberturaId,
                  })),
                }
              : undefined,
          },
        }),
      ),
    );

    return {
      cotizacionId: cotizacion.id,
      cotizacionesVehicularesIds: cotizacionesVehiculares.map((cv) => cv.id),
    };
  }
}
