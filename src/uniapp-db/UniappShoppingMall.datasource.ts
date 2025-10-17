import { Commodity } from '../UniappEntity/UniappShoppingMall/Commodity.entity';
import { CommodityClassify } from '../UniappEntity/UniappShoppingMall/CommodityClassify.entity';
import { CommodityContent } from '../UniappEntity/UniappShoppingMall/CommodityContent.entity';
import { NewPeopleGift } from '../UniappEntity/UniappShoppingMall/NewPeopleGift.entity';
import { DataSource } from 'typeorm';

export const UniappShoppingMall = new DataSource({
  type: 'mysql',
  host: '47.118.17.138',
  port: 3306,
  username: 'root',
  password: '1989315788',
  database: 'UniappShoppingMall',
  entities: [Commodity, CommodityClassify, CommodityContent, NewPeopleGift],
});
