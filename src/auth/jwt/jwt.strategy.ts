import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy} from '@nestjs/passport';
import { Payload } from './jwt.payload';
import { CatsRepository } from 'src/cats/cats.repository';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: CatsRepository) {
    super
    (
      {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretKey',
      ignoreExpiration: false,
      }
    );
  }

  async validate(payload: Payload) {
    const cat = await this.catsRepository.findCatByIdWithoutPassword(
      payload.sub
    );
    if (cat) {
      return cat;
    } else {
      throw new UnauthorizedException(); 
    }
  }
}