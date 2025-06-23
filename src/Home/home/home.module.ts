import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Swiper } from '../../Entity/Swiper.entity';
import { City } from '../../Entity/City.entity';
import { Cities } from '../../Entity/Cities.entity';
import { houseAll } from '../../Entity/house/houseAll.entity';
import { houseAllone } from '../../Entity/house/houseAllone.entity';
import { housefacilities } from '../../Entity/house/housefacilitieses/housefacilities.entity';
import { housefacilitieses } from '../../Entity/house/housefacilitieses/housefacilitieses.entity';
import { houseKeyimg } from '../../Entity/house/houseKeyimg/houseKeyimg.entity';
import { houserNotice } from '../../Entity/house/houserNotice.entity';
import { houseText1 } from '../../Entity/house/houseText1/houseText1.entity';
import { houseText } from '../../Entity/house/houseText1/houseText.entity';
import { houseThree } from '../../Entity/house/houseThree.entity';
import { houseTwo } from '../../Entity/house/houseTwo.entity';
import { houseUser } from '../../Entity/house/houseUser.entity';
import { housMessage } from '../../Entity/house/housMessage.entity';
import { citiesArea } from '../../Entity/house/citiesArea.entity';
import { Resource } from '../../Entity/HouseResource/resource.entity';
import { SelectedData } from '../../Entity/SelectedData.entity';
import { houseimg } from '../../Entity/house/houseKeyimg/houseimg.entity';
import { SelectedDataCopy } from '../../Entity/SelectedDataCopy';
import { SelectedDataHistory } from '../../Entity/SelectedDataHistory';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Swiper,
      City,
      Cities,
      houseAll,
      houseAllone,
      housefacilities,
      housefacilitieses,
      houseKeyimg,
      houserNotice,
      houseText1,
      houseText,
      houseThree,
      houseTwo,
      houseUser,
      housMessage,
      citiesArea,
      SelectedData,
      houseimg,
      SelectedDataCopy,
      SelectedDataHistory,
    ]),
    TypeOrmModule.forFeature([Resource], 'db2'),
  ],
  // 注入控制器
  controllers: [HomeController],
  // 注入服务
  providers: [HomeService],
})
export class HomeModule {}
