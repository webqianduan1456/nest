import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Swiper } from 'src/Entity/Swiper.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SwiperService {
  constructor(
    // 注入轮播图实体
    @InjectRepository(Swiper)
    // 轮播图实体
    private readonly userRepository: Repository<Swiper>,
  ) {}
  // 获取轮播图图片
  getSwiperImg() {
    return this.userRepository.find();
  }
}
