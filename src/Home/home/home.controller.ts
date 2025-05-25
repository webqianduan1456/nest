import { Controller, Get } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeSwiperImg } from '../type/HomeSwiper';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}
  // 返回首页轮播图图片
  @Get('swiperimg')
  async GetSwiperImg(): Promise<HomeSwiperImg[]> {
    // 获取图片
    return await this.homeService.getSwiperImgs('img/NestScenery/');
  }
  // 返回全国以及海外地理名称
  @Get('city')
  getall() {
    return this.homeService.getCity();
  }
  //获取指定城市的房屋商品信息
  @Get('cityHouse')
  getCityHouse() {
    return this.homeService.getCityHouse(45);
  }
  // 获取某个地方区域的信息
  @Get('citiesArea')
  getCitiesArea(id: number = 45) {
    return this.homeService.getCitiesArea(id);
  }
  // 海量房源数据
  @Get('resourceImg')
  getResourceImg() {
    return this.homeService.getResourceImg();
  }
}
