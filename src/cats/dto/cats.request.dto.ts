import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, isNotEmpty } from "class-validator";

export class CatRequestDto {
  // 클라이언트가 어떤 데이터를 보내야 하는지를 정의(제한)하기 위함
  @ApiProperty({
    example: 'ddd@kakao.com',
    description: 'email',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @ApiProperty({
    example: '1234',
    description: 'password',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
  
  @ApiProperty({
    example: '디디디',
    description: 'name',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}