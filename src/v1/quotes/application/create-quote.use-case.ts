import { Injectable } from '@nestjs/common';
import { QuoteService } from '../infrastructure/quote.service';
import { CreateQuoteVehicularDto } from '../interfaces/create-quote.dto';

@Injectable()
export class SaveQuoteUseCase {
  constructor(private readonly quoteService: QuoteService) {}

  async execute(data: CreateQuoteVehicularDto) {
    return await this.quoteService.saveQuote(data);
  }
}
