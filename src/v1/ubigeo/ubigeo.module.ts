import { Module } from '@nestjs/common';
import { CiudadController } from './controllers/ciudad.controller';
import { CiudadService } from './infrastructure/ciudad/ciudad.service';
import { GetCiudadUseCase } from './application/get-ciudad.use_case';

@Module({
  controllers: [CiudadController],
  providers: [CiudadService, GetCiudadUseCase],
  exports: [CiudadService],
})
export class UbigeoModule {}
