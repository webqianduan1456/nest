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
import { houseKeyimg } from '../../Entity/house/houseKeyimg/houseKeyimg.entity';

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
    //获取指定城市的房屋商品图片
    @InjectRepository(houseKeyimg)
    private readonly houseKeyimgRepository: Repository<houseKeyimg>,
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

    // 合并SwiperImgAllMessage数据库数据url
    const SwiperImgAllMessageMerge = async () => {
      const [ossImages, swiperData] = await Promise.all([
        // 获取oss图片列表
        this.ossService.listImagesInFolder(img_url),
        // 获取数据库数据
        SwiperImgAllMessage,
      ]);
      const mergedData = swiperData.map((record, index) => ({
        id: record.id || index + 1,
        img_url: ossImages[index],
        img_message: record.img_message,
      }));
      return mergedData;
    };

    return await SwiperImgAllMessageMerge();
  }

  // 获取国内和国外地理位置
  async getCity() {
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
    return await ProcessCityDate();
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
    // 合并数据SelectedDataList
    const SelectedDataListMerge = async () => {
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
    };
    return await SelectedDataListMerge();
  }
  //获取指定城市的房屋商品信息数据
  async getCityHouse(id: number) {
    const CitiesAll = this.houseAllRepository
      .createQueryBuilder('houseAll')
      .leftJoinAndSelect('houseAll.houseAllone', 'houseAllone')
      .leftJoinAndSelect('houseAll.housefacilities', 'housefacilities')
      .leftJoinAndSelect(
        'housefacilities.housefacilitieses',
        'housefacilitieses',
      )
      .leftJoinAndSelect('houseAll.houserNotice', 'houserNotice')
      .leftJoinAndSelect('houseAll.houseText1', 'houseText1')
      .leftJoinAndSelect('houseText1.houseText', 'houseText')
      .leftJoinAndSelect('houseAll.houseThree', 'houseThree')
      .leftJoinAndSelect('houseAll.houseTwo', 'houseTwo')
      .leftJoinAndSelect('houseAll.houseUser', 'houseUser')
      .leftJoinAndSelect('houseAll.housMessage', 'housMessage')
      .where('houseAll.cityId = :cityId', { cityId: id })
      .orderBy('houseAllone.id', 'ASC')
      .addOrderBy('housefacilities.id', 'ASC')
      .addOrderBy('houserNotice.id', 'ASC')
      .addOrderBy('houseText1.id', 'ASC')
      .addOrderBy('houseText.id', 'ASC')
      .addOrderBy('houseThree.id', 'ASC')
      .addOrderBy('houseTwo.id', 'ASC')
      .addOrderBy('houseUser.id', 'ASC')
      .addOrderBy('housMessage.id', 'ASC')
      .getMany();
    // Merge

    const houseUserMerge = async () => {
      const [ossImages1, CitiesAllData2] = await Promise.all([
        // 获取oss图片列表
        this.ossService.listImagesInFolder('img/useravater/'),
        // 获取数据库数据
        CitiesAll,
      ]);
      if (CitiesAllData2[0]?.houseUser) {
        CitiesAllData2[0].houseUser = CitiesAllData2[0].houseUser.map(
          (item) => {
            return {
              ...item,
              userAvatars: ossImages1[ossImages1.length - 1],
            };
          },
        );
      }
    };
    const housefacilitiesMerge = async () => {
      const [ossImages2, CitiesAllData3] = await Promise.all([
        // 获取oss图片列表
        this.ossService.listImagesInFolder('img/commenSvg/'),
        // 获取数据库数据
        CitiesAll,
      ]);
      if (CitiesAllData3[0]?.housefacilities) {
        CitiesAllData3[0].housefacilities =
          CitiesAllData3[0].housefacilities.map((item, index) => {
            return {
              ...item,
              url: ossImages2[index],
            };
          });
      }
    };
    const CitiesAllMerge = async () => {
      const [ossImages3, ossImages5, initialData] = await Promise.all([
        // 获取oss图片列表
        this.ossService.listImagesInFolder('img/VipHouse/'),
        this.ossService.listImagesInFolder('img/houseLoge/'),
        // 获取数据库数据
        CitiesAll,
      ]);
      let CitiesAllData = initialData;
      if (CitiesAllData) {
        CitiesAllData = CitiesAllData.map((item, index) => {
          return {
            ...item,
            topScroll: ossImages3[index],
            hotelLogo: ossImages5[index],
          };
        });
      }
      return CitiesAllData[0];
    };
    // 合并数据houseUser
    void houseUserMerge();
    // 合并数据housefacilities
    void housefacilitiesMerge();

    return {
      // 合并数据CitiesAll
      HousingResource: await CitiesAllMerge(),
    };
  }
  //获取指定城市的房屋商品图片
  async getCityHouseImg(id: number) {
    const houseKeyimgData = await this.houseKeyimgRepository
      .createQueryBuilder('houseKeyimg')
      .leftJoinAndSelect('houseKeyimg.houseimg', 'houseimg')
      .where('houseKeyimg.cityId = :cityId', { cityId: id })
      .getMany();
    // 合并数据houseKeyimgData
    const houseKeyimgDataMeger = async () => {
      const [ossImages, CitiesAllData] = await Promise.all([
        // 获取oss图片列表
        this.ossService.listImagesInFolder('img/NestImgs/'),
        // 获取数据库数据
        houseKeyimgData,
      ]);
      let NewHouseKeyimgData = CitiesAllData;
      if (CitiesAllData[0]) {
        NewHouseKeyimgData = CitiesAllData.map((item) => {
          return {
            ...item,
            houseimg: item.houseimg.map((ite) => {
              return {
                ...ite,
                url: ossImages[ite.id],
              };
            }),
          };
        });
      }
      return NewHouseKeyimgData;
    };

    return {
      HouseKeyImg: await houseKeyimgDataMeger(),
    };
  }
  // 获取某个地方区域的信息数据
  async getCitiesArea(id: number) {
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
    return await ProcessCitiesArea();
  }
  // 海量房源数据图片
  async getResourceImg(img_url: string) {
    // 查询所有数据
    const SwiperImgAllMessage =
      this.ResourceRepository.createQueryBuilder('resource').getMany();

    // 合并数据SwiperImgAllMessage
    const SwiperImgAllMessageMeager = async () => {
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
    };
    const { mergedData } = await SwiperImgAllMessageMeager();

    return {
      mergedData,
    };
  }
}
