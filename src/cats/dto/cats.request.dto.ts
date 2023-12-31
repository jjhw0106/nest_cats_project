import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, isNotEmpty } from "class-validator";
import { Cat } from "../schemas/cat.schema";

export class CatRequestDto extends PickType(Cat, [
  'email',
  'name',
  'password',
] as const) { }