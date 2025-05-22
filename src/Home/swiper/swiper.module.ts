import { Module } from '@nestjs/common';
import { SwiperController } from './swiper.controller';
import { HomeService } from './swiper.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Swiper } from '../../Entity/Swiper.entity';
import { City } from '../../Entity/City.entity';
import { Cities } from '../../Entity/Cities.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Swiper, City, Cities])],
  // 注入控制器
  controllers: [SwiperController],
  // 注入服务
  providers: [HomeService],
})
export class SwiperModule {}
