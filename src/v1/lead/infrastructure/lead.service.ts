import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { Gender, MaritalStatusPerson, TypePerson } from '@prisma/client';
import { CreateLeadStep1Dto } from '../interfaces/create-lead-step-1.dto';
import { ListLeadsDto } from '../interfaces/list-leads.dto';
import { UpdateLeadDto } from '../interfaces/update-lead.dto';

export interface PaginatedLeads<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

@Injectable()
export class LeadService {
  constructor(private readonly prisma: PrismaService) {}

  async createLead(data: CreateLeadStep1Dto) {
    const existing = await this.prisma.persona.findUnique({
      where: {
        numeroDocumento: data.numeroDocumento,
      },
    });

    if (existing) {
      throw new ConflictException(
        `La persona con número de documento ${data.numeroDocumento} ya existe.`,
      );
    }

    return this.prisma.persona.create({
      data: {
        tipoPersona: data.tipoPersona ?? TypePerson.N,
        nombre: data.nombre,
        apellidos: data.apellidos,
        numeroDocumento: data.numeroDocumento,
        fechaNacimiento: new Date(data.fechaNacimiento),
        correo: data.correo,
        telefono: data.telefono ?? '',
        avatar: data.avatar ?? null,
        ciudadId: data.ciudadId ?? 1,
        contratante: false,
        genero: data.genero ?? Gender.MASCULINO,
        estadoCivil: data.estadoCivil ?? MaritalStatusPerson.S,
        activos: 0,
        pasivos: 0,
        ingresos: 0,
        egresos: 0,
        direccionDomicilio: '',
        direccionTrabajo: '',
        nombreEmpresaTrabajo: '',
        cargoProfesion: '',
      },
    });
  }

  async findLeads(filters: ListLeadsDto): Promise<PaginatedLeads<unknown>> {
    const { nombre, apellidos, tipoPersona, genero, estadoCivil, page, limit } =
      filters;

    const parsedPage = Number(page) || 1;
    const parsedLimit = Number(limit) || 10;

    const where = {
      AND: [
        nombre ? { nombre: { contains: nombre } } : {},
        apellidos ? { apellidos: { contains: apellidos } } : {},
        tipoPersona ? { tipoPersona } : {},
        genero ? { genero } : {},
        estadoCivil ? { estadoCivil } : {},
      ],
    };

    const total = await this.prisma.persona.count({ where });

    const data = await this.prisma.persona.findMany({
      where,
      skip: (parsedPage - 1) * parsedLimit,
      take: parsedLimit,
      orderBy: { createdAt: 'desc' },
      include: {
        ciudad: {
          select: { id: true, nombre: true },
        },
      },
    });

    const totalPages = Math.ceil(total / parsedLimit);
    return {
      data,
      meta: { total, page: parsedPage, limit: parsedLimit, totalPages },
    };
  }

  async updateLead(id: number, data: UpdateLeadDto) {
    const persona = await this.prisma.persona.findUnique({ where: { id } });
    if (!persona) {
      throw new NotFoundException(`Lead con ID ${id} no encontrado.`);
    }

    return this.prisma.persona.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }
}
