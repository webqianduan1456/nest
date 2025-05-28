import { Controller, Get, Query } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}
  // 返回首页轮播图图片
  @Get('swiperimg')
  async GetSwiperImg() {
    // 获取图片
    return await this.homeService.getSwiperImgs('img/NestScenery/');
  }
  // 返回全国以及海外地理名称
  @Get('city')
  async getall() {
    return await this.homeService.getCity();
  }

  @Get('cityHouseList')
  // 获取首页展示列表房屋商品信息数据
  async getCityHouseList(
    @Query('id') id: number,
    @Query('PageNumber') PageNumber: number,
  ) {
    return await this.homeService.getCityHouseList(id, PageNumber);
  }
  //获取指定城市的房屋商品信息
  @Get('cityHouse')
  async getCityHouse(@Query('id') id: number) {
    return await this.homeService.getCityHouse(id);
  }
  //获取指定城市的房屋商品图片
  @Get('cityHouseImg')
  async getCityHouseImg(@Query('id') id: number) {
    return await this.homeService.getCityHouseImg(id);
  }
  // 获取某个地方区域的信息
  @Get('citiesArea')
  async getCitiesArea(@Query('id') id: number) {
    return await this.homeService.getCitiesArea(id);
  }
  // 海量房源数据
  @Get('resource')
  async getResourceImg() {
    return await this.homeService.getResourceImg('img/houseResources/');
  }
}
