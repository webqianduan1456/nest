import { Module } from '@nestjs/common';
import { SwiperController } from './swiper.controller';
import { SwiperService } from './swiper.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Swiper } from 'src/Entity/Swiper.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Swiper])],
  // 注入控制器
  controllers: [SwiperController],
  // 注入服务
  providers: [SwiperService],
})
export class SwiperModule {}
