import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { FiltersFindCitiesDto } from '../../interfaces/find-cities/find-cities.interface';

export interface Paginate<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

@Injectable()
export class CiudadService {
  constructor(private readonly prisma: PrismaService) {}

  async findCitiesByDepartment(
    filters: FiltersFindCitiesDto,
  ): Promise<Paginate<any>> {
    console.log('Filters received:', filters);
    const { page, limit, nombre, provinciaId } = filters;

    const parsedPage = Number(page) || 1;
    const parsedLimit = Number(limit) || 10;

    const where: any = {
      AND: [
        nombre ? { nombre: { contains: nombre } } : {},
        provinciaId ? { provinciaId } : {},
      ],
    };

    if (parsedPage < 1) {
      throw new NotFoundException(
        'El número de página debe ser mayor o igual a 1',
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const total = await this.prisma.ciudad.count({ where });

    const data = await this.prisma.ciudad.findMany({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      where,
      orderBy: { nombre: 'asc' },
    });

    const totalPages = Math.ceil(total / parsedLimit);
    return {
      data,
      meta: { total, page: parsedPage, limit: parsedLimit, totalPages },
    };
  }
}
