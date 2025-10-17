import { Controller, Get } from '@nestjs/common';
import { UniappCoachService } from './UniappCoach.service';

@Controller('UniappCoach')
export class UniappCoachController {
  constructor(private readonly UniappCoachServices: UniappCoachService) {}
  // 获取教练模块中Ai相关数据
  @Get('getAi')
  async getAi() {
    return this.UniappCoachServices.Ai();
  }
  // 获取教练模块中Ai输入框上的导航Title的数据
  @Get('getAssist')
  async getAssist() {
    return this.UniappCoachServices.Assist();
  }
  //  获取教练模块中计划数据
  @Get('getPlan')
  async getPlan() {
    return this.UniappCoachServices.Plan();
  }
  // 获取教练模块中的上传数据
  @Get('getUploadPrompt')
  async getUploadPrompt() {
    return this.UniappCoachServices.UploadPrompt();
  }
}
