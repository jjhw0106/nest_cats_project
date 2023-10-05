import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { AppService } from 'src/app.service';
import { DatabaseModule } from 'src/database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './schemas/cat.schema';
import { CatsRepository } from './cats.repository';
// import { catsProviders } from './cats.provider';

@Module({
  imports: [MongooseModule.forFeature([{name: Cat.name, schema: CatSchema}])],
  controllers: [CatsController,],
  providers: [
    CatsService,
    CatsRepository,
    // ...catsProviders
  ],
  exports: [CatsService],
})
export class CatsModule {}
