import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Swiper } from 'src/Entity/Swiper.entity';
import { OssService } from 'src/OSS/oss';
import { Repository } from 'typeorm';
import { Cities } from '../../Entity/Cities.entity';
import { Resource } from '../../Entity/HouseResource/resource.entity';
import { City } from 'src/Entity/City.entity';
import { SelectedData } from '../../Entity/SelectedData.entity';
import { houseAll } from '../../Entity/house/houseAll.entity';

@Injectable()
export class HomeService {
  constructor(
    private readonly ossService: OssService,
    // 注入轮播图实体
    @InjectRepository(Swiper)
    // 轮播图实体
    private readonly userRepository: Repository<Swiper>,
    // 城市实体
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    // 所有城市实体
    @InjectRepository(Cities)
    private readonly CitiesRepository: Repository<Cities>,
    // 当前热门城市房源数据
    @InjectRepository(SelectedData)
    private readonly SelectedDataRepository: Repository<SelectedData>,
    // 当前热门城市房源数据详细数据
    @InjectRepository(houseAll)
    private readonly houseAllRepository: Repository<houseAll>,
    // 海量房源数据实体
    @InjectRepository(Resource, 'db2')
    private readonly ResourceRepository: Repository<Resource>,
  ) {}
  // 获取轮播图图片
  async getSwiperImgs(img_url: string) {
    // 查询所有数据
    const SwiperImgAllMessage = this.userRepository
      .createQueryBuilder('swiper')
      .getMany();
    const [ossImages, swiperData] = await Promise.all([
      // 获取oss图片列表
      this.ossService.listImagesInFolder(img_url),
      // 获取数据库数据
      SwiperImgAllMessage,
    ]);
    // 合并 OSS 路径和数据库数据
    const mergedData = swiperData.map((record, index) => ({
      id: record.id || index + 1,
      img_url: ossImages[index],
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
  // 获取首页展示列表房屋商品信息数据
  async getCityHouseList(id: number, PageNumber: number = 1) {
    const SelectedDataList = this.SelectedDataRepository.createQueryBuilder(
      'SelectedData',
    )
      .where('SelectedData.cityId = :cityId', { cityId: id })
      .skip((PageNumber - 1) * 6) // 分页跳过的数量
      .take(6)
      .getMany();

    // 合并数据1
    const [ossImages, SelectedDataLists] = await Promise.all([
      // 获取oss图片列表
      this.ossService.listImagesInFolder('img/NestImgs/'),
      // 获取数据库数据
      SelectedDataList,
    ]);
    if (SelectedDataLists) {
      const Selected = SelectedDataLists.map((item, index) => {
        return {
          ...item,
          url: ossImages[item?.id - 1 || index],
        };
      });
      return {
        SelectedS: Selected,
      };
    }
  }
  //获取指定城市的房屋商品信息数据
  async getCityHouse(id: number) {
    const CitiesAll = this.houseAllRepository
      .createQueryBuilder('houseAll')
      .leftJoinAndSelect('houseAll.housMessage', 'housMessage')
      .leftJoinAndSelect('houseAll.housefacilities', 'housefacilities')
      .leftJoinAndSelect(
        'housefacilities.housefacilitieses',
        'housefacilitieses',
      )
      .leftJoinAndSelect('houseAll.houseKeyimg', 'houseKeyimg')
      .leftJoinAndSelect('houseAll.houserNotice', 'houserNotice')
      .leftJoinAndSelect('houseAll.houseText1', 'houseText1')
      .leftJoinAndSelect('houseText1.houseText', 'houseText')
      .leftJoinAndSelect('houseAll.houseThree', 'houseThree')
      .leftJoinAndSelect('houseAll.houseTwo', 'houseTwo')
      .leftJoinAndSelect('houseAll.houseUser', 'houseUser')
      .leftJoinAndSelect('houseAll.houseAllone', 'houseAllone')
      .where('houseAll.cityId = :cityId', { cityId: id })
      .orderBy('houseAll.id_Shop', 'ASC')
      .orderBy('houseKeyimg.orderIndex', 'ASC')
      .orderBy('houseThree.id', 'ASC')
      .getMany();
    const [ossImage, ossImag, CitiesAllDat] = await Promise.all([
      // 获取oss图片列表
      this.ossService.listImagesInFolder('img/VipHouse/'),
      this.ossService.listImagesInFolder('img/houseLoge/'),
      // 获取数据库数据
      CitiesAll,
    ]);
    if (CitiesAllDat[0]) {
      CitiesAll[0] = CitiesAllDat.map((item, index) => {
        return {
          ...item,
          topScroll: ossImage[index],
          hotelLogo: ossImag[index],
        };
      });
    }
    // 合并数据1
    const [ossImages, CitiesAllData] = await Promise.all([
      // 获取oss图片列表
      this.ossService.listImagesInFolder('img/NestImgs/'),
      // 获取数据库数据
      CitiesAll,
    ]);
    if (CitiesAllData[0]?.houseKeyimg) {
      CitiesAllData[0].houseKeyimg = CitiesAllData[0].houseKeyimg.map(
        (item, index) => {
          return {
            ...item,
            url: ossImages[index] || item.url, // 使用OSS图片或原有URL
          };
        },
      );
    }
    // 合并数据2
    const [ossImages1, CitiesAllData2] = await Promise.all([
      // 获取oss图片列表
      this.ossService.listImagesInFolder('img/useravater/'),
      // 获取数据库数据
      CitiesAll,
    ]);
    if (CitiesAllData2[0]?.houseUser) {
      CitiesAllData2[0].houseUser = CitiesAllData2[0].houseUser.map((item) => {
        return {
          ...item,
          userAvatars: ossImages1[ossImages1.length - 1],
        };
      });
    }

    // 合并数据3
    const [ossImages2, CitiesAllData3] = await Promise.all([
      // 获取oss图片列表
      this.ossService.listImagesInFolder('img/commenSvg/'),
      // 获取数据库数据
      CitiesAll,
    ]);
    if (CitiesAllData3[0]?.housefacilities) {
      CitiesAllData3[0].housefacilities = CitiesAllData3[0].housefacilities.map(
        (item, index) => {
          return {
            ...item,
            url: ossImages2[index],
          };
        },
      );
    }

    // 合并数据4
    const [ossImages3, ossImages5, initialData] = await Promise.all([
      // 获取oss图片列表
      this.ossService.listImagesInFolder('img/VipHouse/'),
      this.ossService.listImagesInFolder('img/houseLoge/'),
      // 获取数据库数据
      CitiesAll,
    ]);
    let CitiesAllData34 = initialData;
    if (CitiesAllData34) {
      CitiesAllData34 = CitiesAllData34.map((item, index) => {
        return {
          ...item,
          topScroll: ossImages3[index],
          hotelLogo: ossImages5[index],
        };
      });
    }

    return {
      HousingResource: CitiesAllData34[0],
    };
  }
  // 获取某个地方区域的信息数据
  getCitiesArea(id: number) {
    const CitiesArea = this.CitiesRepository.createQueryBuilder('Cities')
      .leftJoinAndSelect('Cities.citiesArea', 'citiesArea')
      .where('Cities.cityId = :cityId', { cityId: id })
      .getMany();

    // 处理某个地方区域数据
    const ProcessCitiesArea = () => {
      const newCitiesArea = CitiesArea.then((item) => {
        try {
          return {
            cityId: item[0].cityId,
            cityName: item[0].cityName,
            citiesArea: item[0].citiesArea,
          };
        } catch {
          throw new NotFoundException(`数据不存在`);
        }
      });
      return newCitiesArea;
    };
    return ProcessCitiesArea();
  }
  // 海量房源数据图片
  async getResourceImg(img_url: string) {
    // 查询所有数据
    const SwiperImgAllMessage =
      this.ResourceRepository.createQueryBuilder('resource').getMany();
    const [ossImages, swiperData] = await Promise.all([
      // 获取oss图片列表
      this.ossService.listImagesInFolder(img_url),
      // 获取数据库数据
      SwiperImgAllMessage,
    ]);
    // 合并 OSS 路径和数据库数据
    const mergedData = swiperData.map((record, index) => ({
      id: record.id || index + 1,
      title: record.title,
      img: ossImages[index],
    }));

    return {
      mergedData,
    };
  }
}
