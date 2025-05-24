import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Swiper } from 'src/Entity/Swiper.entity';
import { OssService } from 'src/OSS/oss';
import { Repository } from 'typeorm';
import { HomeSwiperImg } from '../type/HomeSwiper';
import { City } from 'src/Entity/City.entity';

@Injectable()
export class HomeService {
  constructor(
    private readonly ossService: OssService,
    // 注入轮播图实体
    @InjectRepository(Swiper)
    // 轮播图实体
    private readonly userRepository: Repository<Swiper>,

    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {}
  // 获取轮播图图片
  async getSwiperImgs(): Promise<HomeSwiperImg[]> {
    // 查询所有数据
    const SwiperImgAllMessage = this.userRepository
      .createQueryBuilder('swiper')
      .getMany();
    const [ossImages, swiperData] = await Promise.all([
      // 获取oss图片列表
      this.ossService.listImagesInFolder('img/NestScenery/'),
      // 获取数据库数据
      SwiperImgAllMessage,
    ]);
    // 合并 OSS 路径和数据库数据
    const mergedData: HomeSwiperImg[] = swiperData.map((record, index) => ({
      id: record.id || index + 1,
      img_url: ossImages[index] || record.img_url,
      img_message: record.img_message,
    }));

    return mergedData;
  }

  // 获取国内和国外地理位置
  getCity() {
    const city = this.cityRepository
      .createQueryBuilder('city')
      .leftJoinAndSelect('city.cityInfo', 'cities')
      .getMany();

    // 地理位置数据整理
    const ProcessCityDate = async () => {
      let Domestic: object = {};
      let Abroad: object = {};
      //  获取国内和国外
      for (let j = 0; j < 2; j++) {
        const n: (object | Array<object>)[] = [];
        const newCityGroup = [
          'A',
          'B',
          'C',
          'D',
          'E',
          'F',
          'G',
          'H',
          'I',
          'J',
          'K',
          'L',
          'M',
          'N',
          'O',
          'P',
          'Q',
          'R',
          'S',
          'T',
          'U',
          'W',
          'X',
          'Y',
          'Z',
        ];
        let n2: Array<object> = [];

        // 对数据库地理位置分类的数据处理
        for (let i = 0; i <= newCityGroup.length - 1; i++) {
          n2 = [];
          // 每次开头push一个group(副数组)
          n2.push({
            group: newCityGroup[i],
          });
          // push每个对应的group城市(副数组)
          await city.then((res) => {
            return res[j].cityInfo.map((item) => {
              if (item.group === newCityGroup[i]) {
                return n2.push({
                  cityId: item.cityId,
                  cityName: item.cityName,
                  pinYin: item.pinYin,
                  gangAoTai: item.gangAoTai,
                  hot: item.hot,
                  longitude: item.longitude,
                  latitude: item.latitude,
                });
              }
            });
          });
          // 最后push主数组
          n.push(n2);
        }
        //  重构数据
        const newCity1 = await city.then((item) => {
          return item.map((ite) => {
            return {
              id: ite.id,
              title: ite.title,
              cityInfo: n,
            };
          });
        });
        if (j === 0) {
          Domestic = newCity1[j];
        } else {
          Abroad = newCity1[j];
        }
      }
      return {
        Domestic,
        Abroad,
      };
    };
    return ProcessCityDate();
  }
}
