import { Controller, Get } from '@nestjs/common';
import { UniappShoppingMallService } from './UniappShoppingMall.service';

@Controller('UniappShoppingMall')
export class UniappShoppingMallController {
  constructor(
    private readonly UniappShoppingMallServices: UniappShoppingMallService,
  ) {}
  // 获取商城商品导航Title
  @Get('getCommodity')
  async getCommodity() {
    return this.UniappShoppingMallServices.Commodity();
  }
  // 获取商城商品分类Title
  @Get('getCommodityClassify')
  async getCommodityClassify() {
    return this.UniappShoppingMallServices.CommodityClassify();
  }
  // 获取商城商品全部商品展示
  @Get('getCommodityContent')
  async getCommodityContent() {
    return this.UniappShoppingMallServices.CommodityContent();
  }
  // 获取商城商品新人礼品数据
  @Get('getNewPeopleGift')
  async getNewPeopleGift() {
    return this.UniappShoppingMallServices.NewPeopleGift();
  }
}
