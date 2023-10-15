import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from 'src/cats/cats.repository';
import { LogInRequestDto } from 'src/cats/dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { Cat } from 'src/cats/schemas/cat.schema';
import { JwtService } from '@nestjs/jwt';
import { CatRequestDto } from 'src/cats/dto/cats.request.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private readonly jwtService: JwtService,
  ) {}

  async jwtLogIn(data: LogInRequestDto) {
    const {email, password} = data;

    const cat: Cat = await this.catsRepository.findCatByEmail(email);

    /* 등록된 email 조회 */
    if(!cat) {
      throw new UnauthorizedException('이메일 또는 비밀번호를 확인해주세요.');
    }

    /* 비밀번호 검증 */
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      cat.password
    );
    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일 또는 비밀번호를 확인해주세요.');
    }

    /* jwt를 만들어 프론트로 반환 */
    const payload = { email: email, sub: cat.id };
    return {
      token: this.jwtService.sign(payload)
    }
  }
}
