import { Injectable } from '@nestjs/common';
import {
  SellerService,
  ResponseAutocomplete,
} from '../infrastructure/seller.service';

@Injectable()
export class AutocompleteSellerUseCase {
  constructor(private readonly sellerService: SellerService) {}

  async execute(query: string): Promise<ResponseAutocomplete<any>> {
    return await this.sellerService.autocompleteSellers(query);
  }
}
