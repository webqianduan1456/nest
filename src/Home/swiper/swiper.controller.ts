import { Controller, Get } from '@nestjs/common';
import { HomeService } from './swiper.service';
import { HomeSwiperImg } from '../type/HomeSwiper';

@Controller('home')
export class SwiperController {
  constructor(private readonly homeService: HomeService) {}
  // 返回首页轮播图图片
  @Get('swiperimg')
  async GetSwiperImg(): Promise<HomeSwiperImg[]> {
    // 获取图片
    return await this.homeService.getSwiperImgs();
  }
  @Get('city')
  getall(id: number) {
    return this.homeService.getCity(id);
  }
}
