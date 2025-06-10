import { differenceInYears } from 'date-fns';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';

export interface ResponseAutocomplete<T> {
  data: T[];
}

@Injectable()
export class SellerService {
  constructor(private readonly prisma: PrismaService) {}

  async autocompleteSellers(query: string): Promise<ResponseAutocomplete<any>> {
    const vendedores = await this.prisma.vendedor.findMany({
      where: {
        deletedAt: null,
        OR: [
          {
            nombre: {
              contains: query,
            },
          },
          {
            apellido: {
              contains: query,
            },
          },
          {
            correo: {
              contains: query,
            },
          },
        ],
      },
      orderBy: {
        nombre: 'asc',
      },
      take: 10,
      select: {
        id: true,
        nombre: true,
        apellido: true,
      },
    });

    return { data: vendedores };
  }
}
