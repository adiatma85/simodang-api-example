import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [LogService, PrismaService],
  exports: [LogService],
})
export class LogModule {}
