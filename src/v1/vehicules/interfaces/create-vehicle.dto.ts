import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateVehicleDto {
  @IsInt()
  clienteId?: number;

  @IsInt()
  modeloVehiculoId?: number;

  @IsInt()
  anio?: number;

  @IsString()
  numeroChassis?: string;

  @IsString()
  numeroMotor?: string;

  @IsString()
  uso?: string;

  @IsOptional()
  @IsString()
  placa?: string;
}
