import { error } from 'console';
import { CatsService } from './cats.service';
import {
  Body,
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
  UseInterceptors,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { PoistiveIntPipe } from 'src/common/pipes/positiveInt.pipe';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CatRequestDto } from './dto/cats.request.dto';

// https://docs.nestjs.com/exception-filters#built-in-http-exceptions
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  
  // // @UseFilters(HttpExceptionFilter) => 각 메소드들이 모두 동일한 Filter를 사용한다면, 클래스 위에 적어서 한번에 적용해도 된다.
  // @Get()
  // getAllCat() {
  //   try {
  //     return { cats: "all cats"}
  //   } catch (err) {
  //     throw new HttpException('the page is null!', 401);
  //   }
  // }

  // @Get(':id')
  // // parseIntPipe: string으로 전달받는 id를 정수타입으로 변환해주며, 타입 validation도 수행해준다.
  // // pipe 패턴 : id가 parseIntPipe ====> PositiveIntPipe 를 거쳐 return값으로 나온다.
  // getCatById(@Param('id', ParseIntPipe, PoistiveIntPipe) id: number) {
  //   console.log(id)
  //   return 'one cat';
  // }

  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @Post()
  async signUp(@Body() body: CatRequestDto) {
    console.log(body);
    return this.catsService.signUp(body)
  }

  @Post('login')
  logIn() {
    return 'login';
  }

  @Post('logout')
  logOut() {
    return 'logout';
  }

  @Post('upload/cats')
  uploadCatImg() {
    return 'upload';
  }
}
