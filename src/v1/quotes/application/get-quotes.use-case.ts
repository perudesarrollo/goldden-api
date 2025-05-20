import { Injectable } from '@nestjs/common';
import { QuoteService, PaginatedQuotes } from '../infrastructure/quote.service';
import { ListQuotesDto } from '../interfaces/list-quotes.dto';

@Injectable()
export class ListQuoteUseCase {
  constructor(private readonly quoteService: QuoteService) {}

  async execute(filters: ListQuotesDto): Promise<PaginatedQuotes<unknown>> {
    return await this.quoteService.findQuotes(filters);
  }
}
