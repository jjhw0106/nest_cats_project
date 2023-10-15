import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

// jwt.strategy를 호출해 validate함수를 실행시킨다.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { // AuthGuard는 AuthStrategy를 실행시켜 준다
  
} 