import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './v1/auth/auth.module';
import { PrismaModule } from './common/prisma.module';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { QuoteModule } from './v1/quotes/quotes.module';
import { LeadModule } from './v1/lead/lead.module';
import { UbigeoModule } from './v1/ubigeo/ubigeo.module';
import { ClientModule } from './v1/client/client.module';
import { VehicleModule } from './v1/vehicules/vehicle.module';
import { SellerModule } from './v1/Seller/seller.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig],
    }),
    AuthModule,
    PrismaModule,
    QuoteModule,
    LeadModule,
    UbigeoModule,
    ClientModule,
    VehicleModule,
    SellerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
