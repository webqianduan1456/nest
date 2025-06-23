import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  //  优先经过第一层
  @UseGuards(AuthGuard('local'))
  //  第二层
  @Post('login')
  login(@Request() req: { user: { id: number; username: string } }) {
    // 首次登录加密
    return this.authService.login(req.user);
  }

  // 这个路由用于测试JWT保护
  @UseGuards(AuthGuard('jwt'))
  @Post('AuthToken')
  getProfile(@Request() req: { user: { id: number; username: string } }) {
    if (req.user) {
      return {
        code: 200,
        message: '验证成功',
      };
    }
  }
}
