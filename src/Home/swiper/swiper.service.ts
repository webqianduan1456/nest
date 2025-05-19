import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Swiper } from 'src/Entity/Swiper.entity';
import { OssService } from 'src/OSS/oss';
import { Repository } from 'typeorm';
export interface HomeDto {
  id: number;
  img_url: string;
  img_message: string;
}
@Injectable()
export class HomeService {
  constructor(
    private readonly ossService: OssService,
    // 注入轮播图实体
    @InjectRepository(Swiper)
    // 轮播图实体
    private readonly userRepository: Repository<Swiper>,
  ) {}
  // 获取轮播图图片
  async getSwiperImgs(): Promise<HomeDto[]> {
    const [ossImages, swiperData] = await Promise.all([
      // 获取oss图片列表
      this.ossService.listImagesInFolder('img/NestScenery/'),
      // 获取数据库数据
      this.userRepository.find(),
    ]);
    // 合并 OSS 路径和数据库数据
    const mergedData: HomeDto[] = swiperData.map((record, index) => ({
      id: record.id || index + 1,
      img_url: ossImages[index] || record.img_url,
      img_message: record.img_message,
    }));

    return mergedData;
  }
}
