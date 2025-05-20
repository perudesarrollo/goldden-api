import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/common/prisma.module';

import { QuoteService } from './infrastructure/quote.service';

import { ListQuoteUseCase } from './application/get-quotes.use-case';
import { QuotesController } from './controllers/quotes.controller';

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [QuotesController],
  providers: [QuoteService, ListQuoteUseCase],
  exports: [QuoteService],
})
export class QuoteModule {}
