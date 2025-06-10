// import {TipoSeguro} from '@prisma/client';
export enum TipoSeguro {
  VEHICULAR = 'VEHICULAR',
  SALUD = 'SALUD',
  GENERALES = 'GENERALES',
}

export enum EstadoCotizacion {
  'BORRADOR' = 'BORRADOR', // Al iniciar
  'PROPUESTA' = 'PROPUESTA', // Ya tiene propuestas generadas
  'SELECCIONADA' = 'SELECCIONADA', // Cliente eligió una opción
  'CONFIRMADA' = 'CONFIRMADA', // Se validó con cliente
  'PAGADA' = 'PAGADA', // Si hay integración de pagos
  'POLIZA_EMITIDA' = 'POLIZA_EMITIDA', // Si se emite una póliza
  'CANCELADA' = 'CANCELADA', // Manual o por expiración
}

import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsInt,
  IsNumber,
  ArrayMinSize,
  IsEnum,
  IsOptional,
  ValidateNested,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateQuoteBaseDto {
  @IsEnum(TipoSeguro)
  tipo?: TipoSeguro;

  @IsInt()
  leadId?: number;

  @IsInt()
  vendedorId?: number;

  @IsDateString()
  fechaExpiracion?: Date;

  @IsOptional()
  @IsBoolean()
  renovacionAuto?: boolean;

  @IsOptional()
  @IsInt()
  clienteId?: number;
}

// VEHICULAR
export class VehiculoCotizacionInput {
  @IsInt()
  vehiculoId?: number;

  @IsInt()
  aseguradoraId?: number;

  @IsInt()
  productoId?: number;

  @IsNumber()
  valorAsegurado?: number;

  @IsNumber()
  primaNeta?: number;

  @IsNumber()
  primaTotal?: number;

  @IsNumber()
  tasa?: number;

  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  coberturasSeleccionadas?: number[];
}

export class CreateQuoteVehicularDto extends CreateQuoteBaseDto {
  @IsEnum(TipoSeguro)
  readonly tipo: TipoSeguro = TipoSeguro.VEHICULAR;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VehiculoCotizacionInput)
  cotizacionVehicular!: VehiculoCotizacionInput[];
}

// SALUD
export class BeneficiarioSaludInput {
  @IsInt()
  personaId?: number;

  @IsInt()
  parentescoId?: number;
}

export class CreateCotizacionSaludDto extends CreateQuoteBaseDto {
  @IsEnum(TipoSeguro)
  tipo: TipoSeguro = TipoSeguro.SALUD;

  @IsString()
  planSalud?: string;

  @IsBoolean()
  coberturaHospitalaria?: boolean;

  @IsBoolean()
  coberturaAmbulatorial?: boolean;

  @IsBoolean()
  coberturaMedicamentos?: boolean;

  @IsOptional()
  @IsString()
  preexistencias?: string;

  @IsNumber()
  limiteCovertura?: number;

  @IsNumber()
  deducible?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BeneficiarioSaludInput)
  beneficiarios?: BeneficiarioSaludInput[];
}

// GENERALES
export class CreateCotizacionGeneralDto extends CreateQuoteBaseDto {
  @IsEnum(TipoSeguro)
  tipo: TipoSeguro = TipoSeguro.GENERALES;

  @IsString()
  tipoRiesgo?: string;

  @IsString()
  descripcionRiesgo?: string;

  @IsOptional()
  @IsString()
  ubicacionRiesgo?: string;

  @IsNumber()
  valorAsegurado?: number;

  @IsNumber()
  deducible?: number;

  @IsOptional()
  @IsString()
  coberturasEspeciales?: string;
}
