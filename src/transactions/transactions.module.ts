import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TransactionsController } from './transactions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get('PAYMENT_GATEWAY_URL'),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: configService.get('PAYMENT_GATEWAY_API_KEY'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [TransactionsService],
  exports: [TransactionsService],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
