import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { CreateVehicleDto } from '../interfaces/create-vehicle.dto';

export interface ResponseAutocomplete<T> {
  data: T[];
}

@Injectable()
export class VehicleService {
  constructor(private readonly prisma: PrismaService) {}

  async autocompleteVehicles(
    query: string,
  ): Promise<ResponseAutocomplete<any>> {
    const vehiculos = await this.prisma.vehiculo.findMany({
      where: {
        deletedAt: null,
        OR: [
          {
            placa: {
              contains: query,
            },
          },
          {
            modeloVehiculo: {
              nombre: {
                contains: query,
              },
            },
          },
          {
            modeloVehiculo: {
              marca: {
                nombre: {
                  contains: query,
                },
              },
            },
          },
        ],
      },
      orderBy: {
        placa: 'asc',
      },
      take: 10,
      select: {
        id: true,
        placa: true,
        anio: true,
        modeloVehiculo: {
          select: {
            nombre: true,
            marca: {
              select: {
                nombre: true,
              },
            },
          },
        },
      },
    });

    return { data: vehiculos };
  }

  async createVehicle(data: CreateVehicleDto) {
    const {
      clienteId,
      modeloVehiculoId,
      anio,
      numeroChassis,
      numeroMotor,
      uso,
      placa,
    } = data;

    const cliente = await this.prisma.cliente.findUnique({
      where: { id: clienteId },
    });
    if (!cliente) throw new NotFoundException(`Cliente ${clienteId} no existe`);

    const modelo = await this.prisma.modeloVehiculo.findUnique({
      where: { id: modeloVehiculoId },
    });

    if (anio === undefined) {
      throw new BadRequestException('El campo anio es obligatorio');
    }

    if (!modelo)
      throw new NotFoundException(
        `Modelo de vehículo ${modeloVehiculoId} no existe`,
      );

    const vehiculo = await this.prisma.vehiculo.create({
      data: {
        clienteId: clienteId!,
        modeloVehiculoId: modeloVehiculoId!,
        anio,
        numeroChassis: numeroChassis!,
        numeroMotor: numeroMotor ?? '',
        uso: uso!,
        placa,
      },
    });

    return vehiculo;
  }
}
