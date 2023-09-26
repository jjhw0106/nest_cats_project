import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { AppService } from 'src/app.service';
import { DatabaseModule } from 'src/database/database.module';
import { catsProviders } from './cats.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [CatsController,],
  providers: [
    CatsService,
    ...catsProviders
  ],
  exports: [CatsService],
})
export class CatsModule {}
