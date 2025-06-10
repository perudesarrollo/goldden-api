import {
  IsString,
  IsEmail,
  IsInt,
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { TypePerson } from '@prisma/client';

export class UpdateContratanteInfoDto {
  [x: string]: any;
  @IsEnum(TypePerson, { message: 'tipoPersona debe ser un valor válido' })
  tipoPersona?: TypePerson;

  @IsString()
  @IsNotEmpty({ message: 'numeroDocumento es obligatorio' })
  numeroDocumento?: string;

  @IsString()
  @IsNotEmpty({ message: 'nombreContratante es obligatorio' })
  nombreContratante?: string;

  @IsEmail({}, { message: 'correo debe ser un email válido' })
  correo?: string;

  @IsString()
  @IsNotEmpty({ message: 'telefono es obligatorio' })
  telefono?: string;

  @IsOptional()
  @IsInt({ message: 'parentescoId debe ser un número entero' })
  parentescoId?: number;

  @IsOptional()
  @IsInt({ message: 'auditoriaId debe ser un número entero' })
  auditoriaId?: number;
}
