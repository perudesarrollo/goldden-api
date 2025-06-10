import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/common/prisma.module';

import { LeadService } from './infrastructure/lead.service';

import { LeadController } from './controllers/lead.controller';
import { CreateLeadUseCase } from './application/create-lead.use-case';
import { ListLeadUseCase } from './application/get-lead.use-case';
import { UpdateLeadUseCase } from './application/update-lead.use-case';
import { GetByIdLeadUseCase } from './application/get-id-lead.use-case';

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [LeadController],
  providers: [
    LeadService,
    CreateLeadUseCase,
    ListLeadUseCase,
    UpdateLeadUseCase,
    GetByIdLeadUseCase,
  ],
  exports: [LeadService],
})
export class LeadModule {}
