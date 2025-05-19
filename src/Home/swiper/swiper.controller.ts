import { Controller, Get } from '@nestjs/common';
import { SwiperService, SwiperDto } from './swiper.service';

@Controller('swiper')
export class SwiperController {
  constructor(private readonly swiperService: SwiperService) {}
  // 返回首页轮播图图片
  @Get('img')
  async GetSwiperImg(): Promise<SwiperDto[]> {
    // 获取图
    return await this.swiperService.getSwiperImgs();
  }
}
