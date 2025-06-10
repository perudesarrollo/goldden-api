import { Module } from '@nestjs/common';
import { SellerService } from './infrastructure/seller.service';
import { SellerController } from './controllers/seller.controller';
import { AutocompleteSellerUseCase } from './application/autocomplete-seller.use-case';

@Module({
  controllers: [SellerController],
  providers: [SellerService, AutocompleteSellerUseCase],
  exports: [SellerService],
})
export class SellerModule {}
