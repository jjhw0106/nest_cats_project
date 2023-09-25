import { CatsService } from './cats/cats.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'API Hello World!';
  }
}
