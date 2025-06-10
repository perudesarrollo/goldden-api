import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma.service';
import { ListQuotesDto } from '../interfaces/list-quotes.dto';

@Injectable()
export class QuoteFindRepository {
  constructor(private prisma: PrismaService) {}

  async findQuotes(filters: ListQuotesDto, page: number, limit: number) {
    const { estado, desde, hasta, clienteId } = filters;

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

    const [total, data] = await this.prisma.$transaction([
      this.prisma.cotizacion.count({ where }),
      this.prisma.cotizacion.findMany({
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
            },
          },
          vendedor: { select: { id: true, nombre: true } },
          lead: {
            select: {
              id: true,
              nombre: true,
              apellidos: true,
              correo: true,
              numeroDocumento: true,
            },
          },
        },
      }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
