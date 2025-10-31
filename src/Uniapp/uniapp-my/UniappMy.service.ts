import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OssService } from '../../OSS/oss';
import { HelpNavigate } from '../../UniappEntity/UniappMy/HelpNavigate.entity';
import { KeepData } from '../../UniappEntity/UniappMy/KeepData.entity';
import { Repository } from 'typeorm';
import { UserGlory } from '../../UniappEntity/UniappMy/UserGlory.entity';
import { UserInsignificant } from '../../UniappEntity/UniappMy/UserInsignificant.entity';

@Injectable()
export class UniappMyService {
  constructor(
    // oss图片服务
    private readonly ossService: OssService,
    @InjectRepository(HelpNavigate, 'uniapp-my')
    private readonly HelpNavigateRepository: Repository<HelpNavigate>,
    @InjectRepository(KeepData, 'uniapp-my')
    private readonly KeepDataRepository: Repository<KeepData>,
    @InjectRepository(UserInsignificant, 'uniapp-my')
    private readonly UserInsignificantRepository: Repository<UserInsignificant>,
    @InjectRepository(UserGlory, 'uniapp-my')
    private readonly UserGloryRepository: Repository<UserGlory>,
  ) {}
  // 获取我的模块的导航Title
  async HelpNavigate() {
    // 数据
    const HelpNavigateData =
      await this.HelpNavigateRepository.createQueryBuilder(
        'HelpNavigate',
      ).getMany();
    // 合并
    const HelpNavigateMerge = async () => {
      const HelpNavigateArray = [
        'note',
        'Collecting',
        'Course',
        'trophy',
        'diet',
        'wallet',
        'gift',
        'house',
        'team',
        'headset',
      ];
      const [data, OssImg] = await Promise.all([
        // 数据
        HelpNavigateData,
        // 图片
        HelpNavigateArray.map((item) => {
          return this.ossService.listImagesInFolder(
            `uniappimg/My/Navigation/${item}.svg`,
          );
        }),
      ]);
      const newOssImg = await Promise.all(OssImg).then((res) => res.flat());

      return data.map((item, index) => ({
        ...item,
        img: newOssImg[index],
      }));
    };

    return await HelpNavigateMerge();
  }
  // 获取我的模块用户运动数数
  async KeepData() {
    // 数据
    const KeepDataData =
      await this.KeepDataRepository.createQueryBuilder('KeepData').getMany();
    return KeepDataData;
  }
  // 获取我的模块用户曾经的辉煌记录与名称
  async UserGlory() {
    // 战绩
    const UserGloryData =
      await this.UserGloryRepository.createQueryBuilder('UserGlory').getMany();
    // 指定图片名字
    const UserGloryImgName = ['lightning', 'MyLightning', 'MyMedal'];
    // 合并
    const [UserGloryDatas, UserGloryImg] = await Promise.all([
      // 数据
      UserGloryData,
      // 图片
      UserGloryImgName.map(async (item) => {
        return await this.ossService.listImagesInFolder(
          `uniappimg/CommonImg/${item}.svg`,
        );
      }),
    ]);

    // 解析promise
    const UserGloryNewImg = await Promise.all(UserGloryImg).then((res) =>
      res.flat(),
    );

    // 返回最新数据
    const UserGloryDataMerge = () => {
      return UserGloryDatas.map((item, index) => {
        return {
          ...item,
          img: UserGloryNewImg[index],
        };
      });
    };

    // 战绩右侧其他
    const UserInsignificantData =
      await this.UserInsignificantRepository.createQueryBuilder(
        'UserInsignificant',
      ).getMany();
    // 指定图片名字
    const UserInsignificantImgName = ['MyIconPk', 'MyIconPk', 'MyFlag'];
    // 合并
    const [UserInsignificantDatas, UserInsignificantImg] = await Promise.all([
      // 数据
      UserInsignificantData,
      // 图片
      UserInsignificantImgName.map((item) => {
        return this.ossService.listImagesInFolder(
          `uniappimg/CommonImg/${item}.svg`,
        );
      }),
    ]);
    // 解析promise
    const UserInsignificantNewImg = await Promise.all(
      UserInsignificantImg,
    ).then((res) => res.flat());

    // 返回最新数据
    const UserInsignificantDataMerge = () => {
      return UserInsignificantDatas.map((item, index) => {
        return {
          ...item,
          img: item.id == 2 ? '' : UserInsignificantNewImg[index],
        };
      });
    };
    return {
      UserGloryDataMerge: UserGloryDataMerge(),
      UserInsignificantDataMerge: UserInsignificantDataMerge(),
    };
  }
}
