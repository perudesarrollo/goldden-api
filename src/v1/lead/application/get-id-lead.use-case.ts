import { Injectable } from '@nestjs/common';
import { Lead, LeadService } from '../infrastructure/lead.service';

@Injectable()
export class GetByIdLeadUseCase {
  constructor(private readonly leadService: LeadService) {}

  async execute(id: number): Promise<Lead> {
    return await this.leadService.findLeadById(id);
  }
}
