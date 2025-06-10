import { differenceInYears } from 'date-fns';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { CreateClientDto } from '../../interfaces/create-client.dto';

export interface ResponseAutocomplete<T> {
  data: T[];
}

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  async autocompleteClients(query: string): Promise<ResponseAutocomplete<any>> {
    const clientes = await this.prisma.cliente.findMany({
      where: {
        deletedAt: null,
        OR: [
          {
            persona: {
              nombre: {
                contains: query,
              },
            },
          },
          {
            persona: {
              numeroDocumento: {
                contains: query,
              },
            },
          },
        ],
      },
      orderBy: {
        persona: {
          nombre: 'asc',
        },
      },
      take: 10,
      select: {
        id: true,
        persona: {
          select: {
            id: true,
            nombre: true,
            apellidos: true,
            numeroDocumento: true,
            tipoPersona: true,
            fechaNacimiento: true,
            telefono: true,
            correo: true,
            genero: true,
            estadoCivil: true,
            direccionDomicilio: true,
            ciudad: {
              select: {
                id: true,
                nombre: true,
              },
            },
          },
        },
      },
    });

    const data = clientes.map((cliente: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const edad = cliente?.persona?.fechaNacimiento
        ? differenceInYears(
            new Date(),
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            new Date(cliente?.persona?.fechaNacimiento),
          )
        : null;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return {
        ...cliente,
        edad,
      };
    });

    return { data };
  }

  async createClient(data: CreateClientDto) {
    const { personaId, vendedorId } = data;

    const persona = await this.prisma.persona.findUnique({
      where: { id: personaId },
    });
    if (!persona)
      throw new NotFoundException(`Persona con id ${personaId} no existe`);

    const clienteExistente = await this.prisma.cliente.findUnique({
      where: { personaId },
    });
    if (clienteExistente) {
      const clienteActualizado = await this.prisma.cliente.update({
        where: { personaId },
        data: {
          fechaAlta: new Date(),
        },
      });
      return {
        message: `La persona con id ${personaId} ya es cliente y se ha actualizado.`,
        cliente: clienteActualizado,
      };
    } else {
      const nuevoCliente = await this.prisma.cliente.create({
        data: {
          personaId,
          vendedorId: vendedorId ?? 1,
        },
      });

      return {
        message: `La persona con id ${personaId} ahora es cliente.`,
        cliente: nuevoCliente,
      };
    }
  }
}
