import { Injectable } from '@nestjs/common';
import { VehicleService } from '../infrastructure/vehicle.service';
import { CreateVehicleDto } from '../interfaces/create-vehicle.dto';

@Injectable()
export class SaveVehicleUseCase {
  constructor(private readonly vehicleService: VehicleService) {}

  async execute(data: CreateVehicleDto) {
    return await this.vehicleService.createVehicle(data);
  }
}
