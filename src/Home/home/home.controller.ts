import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { HomeService } from './home.service';
import { itemDates } from '../type/itemDate';

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
  // 获取首页展示列表房屋商品信息数据
  @Get('cityHouseList')
  async getCityHouseList(
    @Query('id') id: number,
    @Query('PageNumber') PageNumber: number,
    @Query('flay') flay: number | null,
    @Query('ids') ids: number | null,
  ) {
    return await this.homeService.getCityHouseList(id, PageNumber, flay, ids);
  }
  // 返回副本首页展示列表房屋商品信息数据
  @Get('cityHouseListCopy')
  async getCityHouseListCopy(@Query('id') id: number | null) {
    return await this.homeService.getCityHouseListCopy(id);
  }
  //获取指定城市的房屋商品信息
  @Get('cityHouse')
  async getCityHouse(@Query('id') id: number) {
    return await this.homeService.getCityHouse(id);
  }
  //获取指定城市的房屋商品图片
  @Get('cityHouseImg')
  async getCityHouseImg(@Query('id') id: number | null) {
    return await this.homeService.getCityHouseImg(id, true);
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
  // 添加副本首页展示列表房屋商品信息数据
  @Post('cityHouseListCopyAdd')
  async CityHouseListCopyAdd(@Body() itemDates: itemDates) {
    return await this.homeService.CityHouseListCopyAdd(itemDates);
  }
  // 删除副本首页展示列表房屋商品信息数据
  @Post('cityHouseListCopyDelete')
  async cityHouseListCopyDelete(@Body() id: number) {
    return await this.homeService.cityHouseListCopyDelete(id);
  }
}
