import { JwtAuthGuard } from './../auth/jwt/jwt.guard';
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
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { PoistiveIntPipe } from 'src/common/pipes/positiveInt.pipe';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CatRequestDto } from './dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/cat.dto';
import { AuthService } from 'src/auth/auth.service';
import { LogInRequestDto } from './dto/login.request.dto';
import { CurrentUser } from 'src/common/decorators/user.decorator';

// https://docs.nestjs.com/exception-filters#built-in-http-exceptions
@UseFilters(HttpExceptionFilter) // 메소드 당 필터를 적용해도 되지만, @UseFilters(HttpExceptionFilter) => 각 메소드들이 모두 동일한 Filter를 사용한다면, 클래스 위에 적어서 한번에 적용해도 된다.
@UseInterceptors(SuccessInterceptor)
@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
    ) {}
  // @Get(':id')
  // // parseIntPipe: string으로 전달받는 id를 정수타입으로 변환해주며, 타입 validation도 수행해준다.
  // // pipe 패턴 : id가 parseIntPipe ====> PositiveIntPipe 를 거쳐 return값으로 나온다.
  // getCatById(@Param('id', ParseIntPipe, PoistiveIntPipe) id: number) {
  //   console.log(id)
  //   return 'one cat';
  // }
  // @ApiResponse({
  //   status: 500,
  //   description: 'Server Error...'
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Connection Success!',
  //   type: ReadOnlyCatDto
  // })

  @ApiOperation({summary: '현재 고양이 가져오기'})
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat) {
    return cat.ReadOnlyCatDto;
  }
  
  @ApiOperation({summary: '회원가입'})
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    console.log(body);
    return this.catsService.signUp(body)
  }
  
  @ApiOperation({summary: '로그인'})
  @Post('login')
  logIn(@Body() data: LogInRequestDto) {
    console.log("data");
    console.log(data);
    console.log("jwt")
    console.log(this.authService.jwtLogIn(data));
    return this.authService.jwtLogIn(data);
  }
  
  @ApiOperation({summary: '로그아웃'})
  @Post('logout')
  logOut() {
    return 'logout';
  }
  
  @ApiOperation({summary: '이미지업로드'})
  @Post('upload/cats')
  uploadCatImg() {
    return 'upload';
  }
}
