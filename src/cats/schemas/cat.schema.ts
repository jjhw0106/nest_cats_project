import { Prop, Schema, SchemaFactory, } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import mongoose, { Document, SchemaOptions, } from "mongoose";

// class validation 필요
// 각 요소들에 대한 validation 수행, @IsEmail, @IsNotEmpty 등등..
// class-validator 패키지 설치


// DB에서 데이터가 만들어졌을 때 timestamp를 찍어준다.
const options: SchemaOptions = {
  timestamps: true,
}

@Schema(options)
export class Cat extends Document {
  @ApiProperty({
    example: 'ddd@kakao.com',
    description: 'email',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string
  
  @ApiProperty({
    example: '디디디',
    description: 'name',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string
  
  @ApiProperty({
    example: '1234',
    description: 'password',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string
  
  // @ApiProperty({
  //   example: '.com',
  //   description: 'uri',
  //   required: true,
  // })
  // @Prop()
  // @IsString()
  // imgUrl: string

  readonly readOnlyData: {id: string; email: string, name: string};
}

export const CatSchema = SchemaFactory.createForClass(Cat);


// 클라이언트에 보여줄 가상의 view
// 비밀번호 등을 내보내면 안됨으로 아래 virtual을 통해서 필터링을 한다.
CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
  };
})