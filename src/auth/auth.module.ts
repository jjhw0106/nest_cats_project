import { CatsModule } from './../cats/cats.module';
import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { CatsRepository } from 'src/cats/cats.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// middleware -> guard -> interceptor ->  pipes -> con, svc -> interceptor -> exception
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '1y'},
    }),
    forwardRef(()=>CatsModule), 
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
