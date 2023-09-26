import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class CatsService {

  constructor(
    @Inject('CAT_MODEL')
    private catModel: Model<Cat>
  ) {}

  // async create(createCatDto: CreateCatDto): Promise<Cat> {
  //   const createdCat = new this.catModel(createCatDto);
  //   return createdCat.save();
  // }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  // getAllCat() {
  //   return "fff";
  // }
}
