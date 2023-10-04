import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // class-validation을 수행하려면 main에서 등록해 주어야 한다.
  app.useGlobalFilters(new HttpExceptionFilter());
  
  // API 문서 생성
  // SwaggerModule의 'docs' 경로에 API 문서를 생성해준다.
  // controller의 @ApiOperation을 통해 summary(API에 대한 간단 설명) 설정 가능
  const config = new DocumentBuilder()
  .setTitle('title')
  .setDescription('description')
  .setVersion('version')
  .build()
  
  
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  // 다른 사이트에서 접근이 가능하게 할건지 (CORS 찾아보기)
  app.enableCors({
    origin: true,
    credentials: true
  })
  
  const PORT = process.env.PORT
  console.log(PORT);
  await app.listen(PORT);
}
bootstrap();
