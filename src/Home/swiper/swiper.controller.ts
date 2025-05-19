import { Controller, Get } from '@nestjs/common';
import { HomeService, HomeDto } from './swiper.service';

@Controller('home')
export class SwiperController {
  constructor(private readonly homeService: HomeService) {}
  // 返回首页轮播图图片
  @Get('swiperimg')
  async GetSwiperImg(): Promise<HomeDto[]> {
    // 获取图片
    return await this.homeService.getSwiperImgs();
  }
}
