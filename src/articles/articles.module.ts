import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { AdminArticlesController } from './admin.articles.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ArticlesController, AdminArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
