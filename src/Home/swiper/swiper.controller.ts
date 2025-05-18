import { Controller, Get } from '@nestjs/common';
import { SwiperService } from './swiper.service';

@Controller('swiper')
export class SwiperController {
  constructor(private readonly swiperService: SwiperService) {}
  // 返回首页轮播图图片
  @Get('img')
  GetSwiperImg() {
    // 获取图
    return this.swiperService.getSwiperImg();
  }
}
