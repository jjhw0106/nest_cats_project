import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Cat } from "../schemas/cat.schema";

// Cat 스키마를 상속받으면 password도 가져오기 때문에, 그 것을 방지하기 위해 PickType 을 상속받는다.
export class ReadOnlyCatDto extends PickType(Cat, ['email','name'] as const) {
  @ApiProperty({
    example: '12320',
    description: 'id',
  })
  id: string;
}