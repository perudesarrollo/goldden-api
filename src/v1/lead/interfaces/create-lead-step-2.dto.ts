import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  Min,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Gender, MaritalStatusPerson } from '@prisma/client';

export class CreateLeadStep2Dto {
  @IsEnum(Gender)
  genero!: Gender;

  @IsEnum(MaritalStatusPerson)
  estadoCivil: MaritalStatusPerson = 'S';

  @ValidateIf((o: CreateLeadStep2Dto) =>
    ['C', 'U', 'SP'].includes(o.estadoCivil),
  )
  @IsOptional()
  @IsString()
  nombreConyugue?: string;

  @ValidateIf((o: CreateLeadStep2Dto) =>
    ['C', 'U', 'SP'].includes(o.estadoCivil),
  )
  @IsOptional()
  @IsString()
  ciConyugue?: string;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  activos?: number;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  pasivos?: number;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  ingresos?: number;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  egresos?: number;

  @IsNotEmpty()
  @IsString()
  direccionDomicilio?: string;

  @IsNotEmpty()
  @IsString()
  direccionTrabajo?: string;

  @IsNotEmpty()
  @IsString()
  nombreEmpresaTrabajo?: string;

  @IsNotEmpty()
  @IsString()
  cargoProfesion?: string;
}
