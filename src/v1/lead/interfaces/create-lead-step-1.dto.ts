import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEmail,
  IsDateString,
  IsInt,
} from 'class-validator';
import { Gender, MaritalStatusPerson, TypePerson } from '@prisma/client';

export class CreateLeadStep1Dto {
  @IsEnum(TypePerson)
  tipoPersona: TypePerson = 'N';

  @IsNotEmpty()
  @IsString()
  nombre!: string;

  @IsNotEmpty()
  @IsString()
  apellidos!: string;

  @IsNotEmpty()
  @IsString()
  numeroDocumento!: string;

  @IsDateString()
  fechaNacimiento!: Date;

  @IsEmail()
  correo!: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsInt()
  ciudadId?: number;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  @IsEnum(Gender)
  genero!: Gender;

  @IsOptional()
  @IsString()
  @IsEnum(MaritalStatusPerson)
  estadoCivil!: MaritalStatusPerson;
}
