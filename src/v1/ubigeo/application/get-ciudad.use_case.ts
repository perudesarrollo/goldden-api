import { Injectable } from '@nestjs/common';
import {
  CiudadService,
  Paginate,
} from '../infrastructure/ciudad/ciudad.service';
import { FiltersFindCitiesDto } from '../interfaces/find-cities/find-cities.interface';

@Injectable()
export class GetCiudadUseCase {
  constructor(private readonly ciudadService: CiudadService) {}

  async execute(filters: FiltersFindCitiesDto): Promise<Paginate<unknown>> {
    return await this.ciudadService.findCitiesByDepartment(filters);
  }
}
