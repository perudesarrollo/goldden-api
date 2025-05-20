import {
  IsOptional,
  IsEnum,
  IsNumber,
  IsBoolean,
  IsDateString,
  IsInt,
  IsString,
} from 'class-validator';
import { EstadoCotizacion, TipoSeguro } from '@prisma/client';

export class UpdateQuoteDto {
  @IsOptional()
  @IsEnum(EstadoCotizacion)
  estado?: EstadoCotizacion;

  @IsOptional()
  @IsDateString()
  fechaCotizacion?: string;

  @IsOptional()
  @IsDateString()
  fechaExpiracion?: string;

  @IsOptional()
  @IsString()
  aseguradora?: string;

  @IsOptional()
  @IsBoolean()
  renovacionAuto?: boolean;

  @IsOptional()
  @IsEnum(TipoSeguro)
  tipoSeguro?: TipoSeguro;

  @IsOptional()
  @IsInt()
  vendedorId?: number;

  @IsOptional()
  @IsInt()
  clienteId?: number;

  @IsOptional()
  @IsNumber()
  primaTotal?: number;

  @IsOptional()
  @IsNumber()
  primaNeta?: number;

  @IsOptional()
  @IsNumber()
  impuestos?: number;

  @IsOptional()
  @IsNumber()
  comision?: number;

  @IsOptional()
  @IsInt()
  auditoriaId?: number;
}
