import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username', // 与前端请求体字段名一致
      passwordField: 'userpassword',
    });
  }
  //  username和password来自于@UseGuards(AuthGuard('local'))前端传过来的对象
  async validate(username: string, userpassword: string) {
    const user = (await this.authService.validateUser(
      username,
      userpassword,
    )) as object;

    return user;
  }
}
