import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString, IsInt, Min, Max } from 'class-validator';
import { Gender, TypePerson, MaritalStatusPerson } from '@prisma/client';

export class ListLeadsDto {
  @IsOptional() @IsString() nombre?: string;
  @IsOptional() @IsString() apellidos?: string;
  @IsOptional() @IsEnum(TypePerson) tipoPersona?: TypePerson;
  @IsOptional() @IsEnum(Gender) genero?: Gender;
  @IsOptional() @IsEnum(MaritalStatusPerson) estadoCivil?: MaritalStatusPerson;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10;
}
