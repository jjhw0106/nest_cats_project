import { CatsService } from './cats/cats.service';
import { Body, Controller, Get, Param, Req, UseFilters, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { SuccessInterceptor } from './common/interceptors/success.interceptor';
import { HttpExceptionFilter } from './http-exception.filter';


@Controller('')
export class AppController {
  constructor(
    private readonly appService: AppService,
    // private readonly catsService: CatsService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
