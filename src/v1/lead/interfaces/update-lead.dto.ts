import {
  IsString,
  IsEmail,
  IsInt,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsEnum,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Gender, MaritalStatusPerson, TypePerson } from '@prisma/client';
import { UpdateContratanteInfoDto } from './contratante-info-data.dto';

export class UpdateLeadDto {
  [x: string]: any;
  @IsOptional()
  @IsEnum(TypePerson)
  tipoPersona?: TypePerson;

  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  apellidos?: string;

  @IsOptional()
  @IsString()
  numeroDocumento?: string;

  @IsOptional()
  @IsDateString()
  fechaNacimiento?: string;

  @IsOptional()
  @IsEmail()
  correo?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsInt()
  ciudadId?: number;

  @IsOptional()
  @IsInt()
  auditoriaId?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateContratanteInfoDto)
  contratanteInfo?: UpdateContratanteInfoDto;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsBoolean()
  contratante?: boolean;

  @IsOptional()
  @IsEnum(Gender)
  genero?: Gender;

  @IsOptional()
  @IsEnum(MaritalStatusPerson)
  estadoCivil?: MaritalStatusPerson;

  @IsOptional()
  @IsString()
  nombreConyugue?: string;

  @IsOptional()
  @IsString()
  ciConyugue?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  activos?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  pasivos?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  ingresos?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  egresos?: number;

  @IsOptional()
  @IsString()
  direccionDomicilio?: string;

  @IsOptional()
  @IsString()
  direccionTrabajo?: string;

  @IsOptional()
  @IsString()
  nombreEmpresaTrabajo?: string;

  @IsOptional()
  @IsString()
  cargoProfesion?: string;
}
