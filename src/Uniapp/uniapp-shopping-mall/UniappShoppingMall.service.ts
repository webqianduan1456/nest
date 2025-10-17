import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OssService } from '../../OSS/oss';
import { Commodity } from '../../UniappEntity/UniappShoppingMall/Commodity.entity';
import { CommodityClassify } from '../../UniappEntity/UniappShoppingMall/CommodityClassify.entity';
import { CommodityContent } from '../../UniappEntity/UniappShoppingMall/CommodityContent.entity';
import { NewPeopleGift } from '../../UniappEntity/UniappShoppingMall/NewPeopleGift.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UniappShoppingMallService {
  constructor(
    // oss图片服务
    private readonly ossService: OssService,
    @InjectRepository(Commodity, 'uniapp-shopping-mall')
    private readonly CommodityRepository: Repository<Commodity>,
    @InjectRepository(CommodityClassify, 'uniapp-shopping-mall')
    private readonly CommodityClassifyRepository: Repository<CommodityClassify>,
    @InjectRepository(CommodityContent, 'uniapp-shopping-mall')
    private readonly CommodityContentRepository: Repository<CommodityContent>,
    @InjectRepository(NewPeopleGift, 'uniapp-shopping-mall')
    private readonly NewPeopleGiftRepository: Repository<NewPeopleGift>,
  ) {}
  // 获取商城商品导航Title
  async Commodity() {
    const CommodityData =
      await this.CommodityRepository.createQueryBuilder('Commodity').getMany();
    return CommodityData;
  }
  // 获取商城商品分类Title
  async CommodityClassify() {
    // 数据
    const CommodityClassifyData =
      await this.CommodityClassifyRepository.createQueryBuilder(
        'CommodityClassify',
      ).getMany();
    // 合并
    const CommodityClassifyMerge = async () => {
      const [data, OssImg] = await Promise.all([
        // 数据
        CommodityClassifyData,
        // 图片
        CommodityClassifyData.map((item) => {
          return this.ossService.listImagesInFolder(
            `uniappimg/ShoppingMall/All/Navigation/${item.ClassifyId === CommodityClassifyData.length ? 'more' : item.ClassifyId}`,
          );
        }),
      ]);
      const newOssImg = await Promise.all(OssImg).then((res) => res.flat());

      return data.map((item, index) => ({
        ...item,
        img: newOssImg[index],
      }));
    };

    return await CommodityClassifyMerge();
  }
  // 获取商城商品全部商品展示
  async CommodityContent() {
    // 数据
    const CommodityContentData =
      await this.CommodityContentRepository.createQueryBuilder(
        'CommodityContent',
      ).getMany();
    // 合并
    const CommodityContentMerge = async () => {
      const [data, OssImg] = await Promise.all([
        // 数据
        CommodityContentData,
        // 图片
        CommodityContentData.map((item) => {
          return this.ossService.listImagesInFolder(
            `uniappimg/ShoppingMall/All/ProductSection/${item.ContentId}.webp`,
          );
        }),
      ]);
      const newOssImg = await Promise.all(OssImg).then((res) => res.flat());

      return data.map((item, index) => ({
        ...item,
        content: newOssImg[index],
      }));
    };

    return await CommodityContentMerge();
  }
  // 获取商城商品新人礼品数据
  async NewPeopleGift() {
    // 数据
    const NewPeopleGiftData =
      await this.NewPeopleGiftRepository.createQueryBuilder(
        'NewPeopleGift',
      ).getMany();
    // 合并
    const NewPeopleGiftMerge = async () => {
      const [data, OssImg] = await Promise.all([
        // 数据
        NewPeopleGiftData,
        // 图片
        NewPeopleGiftData.map((item) => {
          return this.ossService.listImagesInFolder(
            `uniappimg/ShoppingMall/All/NewPeopleGift/${item.id}.webp`,
          );
        }),
      ]);
      const newOssImg = await Promise.all(OssImg).then((res) => res.flat());

      return data.map((item, index) => ({
        ...item,
        TitleImg: newOssImg[index],
      }));
    };

    return await NewPeopleGiftMerge();
  }
}
