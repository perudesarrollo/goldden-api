import { IsInt } from 'class-validator';

export class CreateClientDto {
  @IsInt()
  personaId!: number;

  @IsInt()
  vendedorId?: number;
}
