import { Injectable } from '@nestjs/common';
import { LeadService } from 'src/v1/lead/infrastructure/lead.service';
import { CreateLeadStep1Dto } from '../interfaces/create-lead-step-1.dto';

@Injectable()
export class CreateLeadUseCase {
  constructor(private readonly leadService: LeadService) {}

  async execute(data: CreateLeadStep1Dto) {
    return this.leadService.createLead(data);
  }
}
