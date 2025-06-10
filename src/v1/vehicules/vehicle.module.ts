import { Module } from '@nestjs/common';
import { VehicleController } from './controllers/vehicle.controller';
import { AutocompleteVehicleUseCase } from './application/autocomplete-vehicle.use-case';
import { VehicleService } from './infrastructure/vehicle.service';
import { SaveVehicleUseCase } from './application/create-vehicle.use-case';

@Module({
  controllers: [VehicleController],
  providers: [AutocompleteVehicleUseCase, VehicleService, SaveVehicleUseCase],
  exports: [VehicleService],
})
export class VehicleModule {}
