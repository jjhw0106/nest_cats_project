import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    // 응답까지 logging, on -> response가 왔을 때(finish) 일어나는 이벤트
    res.on('finish', () => {
      this.logger.log(`${req.ip} ${req.method} ${res.statusCode}`);
    });
    next();
  }
}
