import { Controller, Get, HttpException, Query } from '@nestjs/common';
import { UniAppHomeService } from './UniappHome.service';

@Controller('UniAppHome')
export class UniAppHomeController {
  constructor(private readonly UniAppHomeServices: UniAppHomeService) {}
  // 返回首页所有数据
  @Get('CommunityCircle')
  getHomeCommunityCircle() {
    return this.UniAppHomeServices.getHomeCommunityCircle();
  }
  // 个人排行榜
  @Get('CommunityList')
  getCommunityList() {
    return this.UniAppHomeServices.getCommunityList();
  }
  // 获取全部用户发布的动态信息
  @Get('CommunityDynamic')
  getCommunityDynamic(@Query('UserId') UserId: number) {
    if (UserId && UserId !== null && UserId > 0) {
      return this.UniAppHomeServices.getCommunityDynamic(UserId);
    } else {
      throw new HttpException(' 用户ID不能为空', 400);
    }
  }
  // 获取广告信息
  @Get('CommunityAdvertising')
  CommunityAdvertising(@Query('UserId') UserId: number) {
    if (UserId && UserId !== null && UserId > 0) {
      return this.UniAppHomeServices.getCommunityAdvertising(UserId);
    } else {
      throw new HttpException(' 用户ID不能为空', 400);
    }
  }
  // 首页推荐
  @Get('getRecommendData')
  async getRecommendData() {
    return this.UniAppHomeServices.getRecommendData();
  }
  // 首页推荐导航数据
  @Get('getRecommendNavigation')
  async getRecommendNavigation() {
    return this.UniAppHomeServices.getRecommendNavigation();
  }
  // 获取课程导航数据
  @Get('getCourseNavigate')
  async getCourseNavigate() {
    return this.UniAppHomeServices.getCourseNavigate();
  }
  // 获取选项Title
  @Get('getCourseSelect')
  async getCourseSelect() {
    return this.UniAppHomeServices.getCourseSelect();
  }
  // 课程精选
  @Get('getCourseSelectChoicenes')
  async CourseSelectChoicenes() {
    return this.UniAppHomeServices.CourseSelectChoicenes();
  }
  // 获取自定义训练计划
  @Get('PlanCustom')
  async getPlanCustom() {
    return this.UniAppHomeServices.PlanCustom();
  }
  // 获取会员训练计划
  @Get('PlanMember')
  async getPlanMember() {
    return this.UniAppHomeServices.getPlanMember();
  }

  // 获取所有训练内容
  @Get('PlanSelect')
  async getPlanSelect() {
    return this.UniAppHomeServices.PlanSelect();
  }
  // 获取奖牌导航Title
  @Get('MedalNavigation')
  async getMedalNavigation() {
    return this.UniAppHomeServices.MedalNavigation();
  }

  // 获取奖牌选项Title
  @Get('MedalSelect')
  async getMedalSelect() {
    return this.UniAppHomeServices.MedalSelect();
  }
  // 获取奖杯默认内容
  @Get('getMedal')
  async getMedal() {
    return this.UniAppHomeServices.Medal();
  }
  // 获取比赛导航Title
  @Get('getGameNavigate')
  async getGameNavigate() {
    return this.UniAppHomeServices.GameNavigate();
  }
  // 获取比赛选项Title
  @Get('getGameSelect')
  async getGameSelect() {
    return this.UniAppHomeServices.GameSelect();
  }
  // 获取比赛默认内容
  @Get('getGame')
  async getGame() {
    return this.UniAppHomeServices.Game();
  }
}
