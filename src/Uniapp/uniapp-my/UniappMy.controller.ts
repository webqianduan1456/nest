import { UniappMyService } from './UniappMy.service';
import { Controller, Get } from '@nestjs/common';

@Controller('UniappMy')
export class UniappMyController {
  constructor(private readonly UniappMyServices: UniappMyService) {}
  // 获取我的模块的导航Title
  @Get('getHelpNavigate')
  async getHelpNavigate() {
    return this.UniappMyServices.HelpNavigate();
  }
  // 获取我的模块用户运动数数
  @Get('getKeepData')
  async getKeepData() {
    return this.UniappMyServices.KeepData();
  }
  // 获取我的模块用户曾经的辉煌记录与名称
  @Get('getUserInfoIcon')
  async getUserInfoIcon() {
    return this.UniappMyServices.UserInfoIcon();
  }
}
