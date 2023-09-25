import { error } from 'console';
import { CatsService } from './cats.service';
import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { PoistiveIntPipe } from 'src/common/pipes/positiveInt.pipe';

// https://docs.nestjs.com/exception-filters#built-in-http-exceptions
@UseFilters(HttpExceptionFilter)
@Controller('cats')
export class CatsController {
  constructor(private readonly CatsService: CatsService) {}
  
  // @UseFilters(HttpExceptionFilter) => 각 메소드들이 모두 동일한 Filter를 사용한다면, 클래스 위에 적어서 한번에 적용해도 된다.
  @Get()
  getAllCat() {
    try {
      throw error;
    } catch (err) {
      throw new HttpException('the page is null!', 401);
    }
  }

  @Get(':id')
  // parseIntPipe: string으로 전달받는 id를 정수타입으로 변환해주며, 타입 validation도 수행해준다.
  // pipe 패턴 : id가 parseIntPipe ====> PositiveIntPipe 를 거쳐 return값으로 나온다.
  getCatById(@Param('id', ParseIntPipe, PoistiveIntPipe) id: number) {
    console.log(id)
    return 'one cat';
  }

  @Post()
  createCat() {
    return 'create a cat';
  }

  @Put(':id')
  updateCat() {
    return 'update partial cat';
  }

  @Patch(':id')
  updatePartialCat() {
    return 'update partial cat';
  }

  @Delete(':id')
  deleteCat() {
    return 'delete a cat';
  }
}