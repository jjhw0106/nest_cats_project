import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ReadOnlyCatDto {
  @ApiProperty({
    example: 'ddd',
    description: 'ID',
    required: true,
  })
  id: string;

  @ApiProperty({
    example: 'ddd@kakao.com',
    description: 'email',
    required: true,
  })
  email: string;
  
  @ApiProperty({
    example: '디디디',
    description: 'name',
    required: true,
  })
  name: string;
}