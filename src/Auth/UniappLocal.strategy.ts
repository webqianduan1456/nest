import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategyUniapp extends PassportStrategy(
  Strategy,
  'uniapp-local',
) {
  // 获取自定义字段(前端传递的字段必须是username和userpassword)
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username', // 与前端请求体字段名一致
      passwordField: 'userpassword',
    });
  }
  //  username和password来自于@UseGuards(AuthGuard('local'))前端传过来的对象(自动解析request body)
  async validate(username: string, userpassword: string) {
    // pc端
    // 将获取到的字段传入到验证函数
    const user = (await this.authService.validateUserUniapp(
      username,
      userpassword,
    )) as object;

    return user;
  }
}
