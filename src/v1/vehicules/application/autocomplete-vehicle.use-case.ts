import { Injectable } from '@nestjs/common';
import {
  ResponseAutocomplete,
  VehicleService,
} from '../infrastructure/vehicle.service';

@Injectable()
export class AutocompleteVehicleUseCase {
  constructor(private readonly vehicleService: VehicleService) {}

  async execute(query: string): Promise<ResponseAutocomplete<any>> {
    return await this.vehicleService.autocompleteVehicles(query);
  }
}
