import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OssService } from '../../OSS/oss';
import { HelpNavigate } from '../../UniappEntity/UniappMy/HelpNavigate.entity';
import { KeepData } from '../../UniappEntity/UniappMy/KeepData.entity';
import { UserInfoIcon } from '../../UniappEntity/UniappMy/UserInfoIcon.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UniappMyService {
  constructor(
    // oss图片服务
    private readonly ossService: OssService,
    @InjectRepository(HelpNavigate, 'uniapp-my')
    private readonly HelpNavigateRepository: Repository<HelpNavigate>,
    @InjectRepository(KeepData, 'uniapp-my')
    private readonly KeepDataRepository: Repository<KeepData>,
    @InjectRepository(UserInfoIcon, 'uniapp-my')
    private readonly UserInfoIconRepository: Repository<UserInfoIcon>,
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
  async UserInfoIcon() {
    // 数据
    const UserInfoIconData =
      await this.UserInfoIconRepository.createQueryBuilder(
        'UserInfoIcon',
      ).getMany();
    // 合并
    const UserInfoIconMerge = async () => {
      const UserInfoIconArray = ['lightning', 'medal', 'icon_pk', 'flag'];
      const [data, OssImg] = await Promise.all([
        // 数据
        UserInfoIconData,
        // 图片
        UserInfoIconArray.map((item) => {
          return this.ossService.listImagesInFolder(
            `uniappimg/My/UserInfo/${item}.svg`,
          );
        }),
      ]);
      const newOssImg = await Promise.all(OssImg).then((res) => res.flat());

      return data.map((item) => ({
        ...item,
        lightningIcon: newOssImg[0],
        trophyIcon: newOssImg[1],
        pkIcon: newOssImg[2],
        joinIcon: newOssImg[3],
      }));
    };

    return await UserInfoIconMerge();
  }
}
