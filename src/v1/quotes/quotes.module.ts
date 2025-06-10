import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/common/prisma.module';

import { QuoteService } from './infrastructure/quote.service';

import { ListQuoteUseCase } from './application/get-quotes.use-case';
import { QuotesController } from './controllers/quotes.controller';
import { QuoteFindRepository } from './infrastructure/quote-find.repository';
import { SaveQuoteUseCase } from './application/create-quote.use-case';

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [QuotesController],
  providers: [
    QuoteService,
    ListQuoteUseCase,
    SaveQuoteUseCase,
    QuoteFindRepository,
  ],
  exports: [QuoteService],
})
export class QuoteModule {}
