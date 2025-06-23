import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(protected configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('auth.secret') || '',
    });
  }
  // 传递token与第一次登录并存入的payload用户信息进行对比
  validate(payload: { id: number; username: string }) {
    if (payload) {
      return { id: payload.id, username: payload.username };
    }
    return {
      code: 401,
      message: '验证失败',
    };
  }
}
