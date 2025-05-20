import { Injectable } from '@nestjs/common';
import { LeadService } from 'src/v1/lead/infrastructure/lead.service';
import { UpdateLeadDto } from '../interfaces/update-lead.dto';

@Injectable()
export class UpdateLeadUseCase {
  constructor(private readonly leadService: LeadService) {}

  async execute(id: number, data: UpdateLeadDto) {
    return this.leadService.updateLead(id, data);
  }
}
