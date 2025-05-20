import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { ListQuotesDto } from '../interfaces/list-quotes.dto';
import { UpdateQuoteDto } from '../interfaces/update-quote.dto';

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
  constructor(private readonly prisma: PrismaService) {}

  async findQuotes(filters: ListQuotesDto): Promise<PaginatedQuotes<unknown>> {
    const { estado, desde, hasta, clienteId, page, limit } = filters;

    const parsedPage = Number(page) || 1;
    const parsedLimit = Number(limit) || 10;

    const where: any = {
      AND: [
        estado ? { estado } : {},
        clienteId ? { clienteId } : {},
        desde && hasta
          ? {
              createdAt: {
                gte: new Date(desde),
                lte: new Date(hasta),
              },
            }
          : {},
      ],
    };

    const total = await this.prisma.cotizacion.count({ where });

    const data = await this.prisma.cotizacion.findMany({
      where,
      skip: (parsedPage - 1) * parsedLimit,
      take: parsedLimit,
      orderBy: { createdAt: 'desc' },
      include: {
        cliente: {
          include: {
            persona: {
              select: {
                id: true,
                nombre: true,
                apellidos: true,
                avatar: true,
                correo: true,
                numeroDocumento: true,
              },
            },
            vendedor: { select: { id: true, nombre: true } },
          },
        },
        vehiculos: true,
      },
    });

    const totalPages = Math.ceil(total / parsedLimit);
    return {
      data,
      meta: { total, page: parsedPage, limit: parsedLimit, totalPages },
    };
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
}
