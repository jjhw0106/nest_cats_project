import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cat } from "./schemas/cat.schema";
import { CatRequestDto } from "./dto/cats.request.dto";

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) { }
  
  async existsByEmail(email: string): Promise<boolean> {
    try{
      // const result = true/*  await this.catModel.exists({ email }); */
      const result = await this.catModel.exists({ email });
      return result ? true : false;
    } catch (error) {
      throw new HttpException('db error', 400);
    }
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }
  
  async findCatByEmail(email: string): Promise<Cat> {
    // const email = data.email;
    const result = await this.catModel.findOne({email: email});
    console.log(result)
    return result
  }

  async findCatByIdWithoutPassword(catId: string): Promise<Cat | null> {
    const cat = await this.catModel.findById(catId).select('-password');
    return cat;
  }
}