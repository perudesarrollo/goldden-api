import { Injectable } from '@nestjs/common';
import { LeadService, PaginatedLeads } from '../infrastructure/lead.service';
import { ListLeadsDto } from '../interfaces/list-leads.dto';

@Injectable()
export class ListLeadUseCase {
  constructor(private readonly leadService: LeadService) {}

  async execute(_filters: ListLeadsDto): Promise<PaginatedLeads<unknown>> {
    return await this.leadService.findLeads(_filters);
  }
}
