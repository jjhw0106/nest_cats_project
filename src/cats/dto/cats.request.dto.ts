import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, isNotEmpty } from "class-validator";
import { Cat } from "../schemas/cat.schema";

export class CatRequestDto extends Cat {
}