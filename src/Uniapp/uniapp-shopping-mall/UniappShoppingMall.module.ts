import { Module } from '@nestjs/common';
import { UniappShoppingMallController } from './UniappShoppingMall.controller';
import { UniappShoppingMallService } from './UniappShoppingMall.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commodity } from '../../UniappEntity/UniappShoppingMall/Commodity.entity';
import { CommodityClassify } from '../../UniappEntity/UniappShoppingMall/CommodityClassify.entity';
import { CommodityContent } from '../../UniappEntity/UniappShoppingMall/CommodityContent.entity';
import { NewPeopleGift } from '../../UniappEntity/UniappShoppingMall/NewPeopleGift.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Commodity, CommodityClassify, CommodityContent, NewPeopleGift],
      'uniapp-shopping-mall',
    ),
  ],
  controllers: [UniappShoppingMallController],
  providers: [UniappShoppingMallService],
})
export class UniappShoppingMallModule {}
