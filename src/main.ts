import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // class-validation을 수행하려면 main에서 등록해 주어야 한다.
  app.useGlobalFilters(new HttpExceptionFilter());
  const PORT = process.env.PORT
  console.log(PORT);
  await app.listen(8000);
}
bootstrap();
