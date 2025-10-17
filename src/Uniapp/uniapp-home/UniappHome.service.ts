import { HttpException, Injectable } from '@nestjs/common';
import { CommunityCircle } from '../../UniappEntity/uniappHome/community/CommunityCircle.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OssService } from '../../OSS/oss';
import { CommunityList } from '../../UniappEntity/uniappHome/community/CommunityList.entity';
import { CommunityUserDynamicTitle } from '../../UniappEntity/uniappHome/community/CommunityUserDynamic/CommunityUserDynamicTitle.entity';
import { CommunityUserDynamicImg } from '../../UniappEntity/uniappHome/community/CommunityUserDynamic/CommunityUserDynamicImg.entity';
import { CommunityUserDynamicImgChild } from '../../UniappEntity/uniappHome/community/CommunityUserDynamic/CommunityUserDynamicImgChild.entity';
import { dataMeger } from '../../uniappHooks/commonImg';
import { CommunityUserDynamicAuthorContentSharing } from '../../UniappEntity/uniappHome/community/CommunityUserDynamic/CommunityUserDynamicAuthorContentSharing.entity';
import dayjs from 'dayjs';
import { CommunityAdvertising } from '../../UniappEntity/uniappHome/community/CommunityAdvertising.entity';
import { UniappUserInfo } from '../../UniappEntity/user/UserInfo.entity';
import { Recommend } from '../../UniappEntity/uniappHome/recommend/Recommend.entity';
import { RecommendNavigation } from '../../UniappEntity/uniappHome/recommend/RecommendNavigation.entity';
import { CourseNavigate } from '../../UniappEntity/uniappHome/Course/CourseNavigate.entity';
import { CourseSelect } from '../../UniappEntity/uniappHome/Course/CourseSelect.entity';
import { CourseSelectChoicenes } from '../../UniappEntity/uniappHome/Course/CourseSelectChoicenes.entity';
import { PlanCustom } from '../../UniappEntity/uniappHome/Plan/PlanCustom.entity';
import { PlanMember } from '../../UniappEntity/uniappHome/Plan/PlanMember.entity';
import { PlanSelect } from '../../UniappEntity/uniappHome/Plan/PlanSelect.entity';
import { MedalNavigation } from '../../UniappEntity/uniappHome/Medal/MedalNavigation.entity';
import { MedalSelect } from '../../UniappEntity/uniappHome/Medal/MedalSelect.entity';
import { Medal } from '../../UniappEntity/uniappHome/Medal/Medal.entity';
import { GameNavigate } from '../../UniappEntity/uniappHome/Game/GameNavigate.entity';
import { GameSelect } from '../../UniappEntity/uniappHome/Game/GameSelect.entity';
import { Game } from '../../UniappEntity/uniappHome/Game/Game.entity';

@Injectable()
export class UniAppHomeService {
  constructor(
    // oss图片服务
    private readonly ossService: OssService,
    // Home
    @InjectRepository(CommunityCircle, 'uniapp-home')
    private readonly CommunityCircleRepository: Repository<CommunityCircle>,
    @InjectRepository(CommunityList, 'uniapp-home')
    private readonly CommunityListRepository: Repository<CommunityList>,
    @InjectRepository(CommunityUserDynamicTitle, 'uniapp-home')
    private readonly CommunityUserDynamicTitleRepository: Repository<CommunityUserDynamicTitle>,
    @InjectRepository(CommunityUserDynamicImg, 'uniapp-home')
    private readonly CommunityUserDynamicImgRepository: Repository<CommunityUserDynamicImg>,
    @InjectRepository(CommunityUserDynamicImgChild, 'uniapp-home')
    private readonly CommunityUserDynamicImgChildRepository: Repository<CommunityUserDynamicImgChild>,
    @InjectRepository(CommunityUserDynamicAuthorContentSharing, 'uniapp-home')
    private readonly CommunityUserDynamicAuthorContentSharingRepository: Repository<CommunityUserDynamicAuthorContentSharing>,
    @InjectRepository(CommunityAdvertising, 'uniapp-home')
    private readonly CommunityAdvertisingRepository: Repository<CommunityAdvertising>,
    @InjectRepository(Recommend, 'uniapp-home')
    private readonly RecommendRepository: Repository<Recommend>,
    @InjectRepository(RecommendNavigation, 'uniapp-home')
    private readonly RecommendNavigationRepository: Repository<RecommendNavigation>,
    @InjectRepository(CourseNavigate, 'uniapp-home')
    private readonly CourseNavigateRepository: Repository<CourseNavigate>,
    @InjectRepository(CourseSelect, 'uniapp-home')
    private readonly CourseSelectRepository: Repository<CourseSelect>,
    @InjectRepository(CourseSelectChoicenes, 'uniapp-home')
    private readonly CourseSelectChoicenesRepository: Repository<CourseSelectChoicenes>,
    @InjectRepository(PlanCustom, 'uniapp-home')
    private readonly PlanCustomRepository: Repository<PlanCustom>,
    @InjectRepository(PlanMember, 'uniapp-home')
    private readonly PlanMemberRepository: Repository<PlanMember>,
    @InjectRepository(PlanSelect, 'uniapp-home')
    private readonly PlanSelectRepository: Repository<PlanSelect>,
    @InjectRepository(MedalNavigation, 'uniapp-home')
    private readonly MedalNavigationRepository: Repository<MedalNavigation>,
    @InjectRepository(MedalSelect, 'uniapp-home')
    private readonly MedalSelectRepository: Repository<MedalSelect>,
    @InjectRepository(Medal, 'uniapp-home')
    private readonly MedalRepository: Repository<Medal>,
    @InjectRepository(GameNavigate, 'uniapp-home')
    private readonly GameNavigateRepository: Repository<GameNavigate>,
    @InjectRepository(GameSelect, 'uniapp-home')
    private readonly GameSelectRepository: Repository<GameSelect>,
    @InjectRepository(Game, 'uniapp-home')
    private readonly GameRepository: Repository<Game>,
    // UserInfo
    @InjectRepository(UniappUserInfo, 'uniapp-userinfo')
    private readonly UniappUserInfoRepository: Repository<UniappUserInfo>,
  ) {}

  // 获取首页圈子数据
  async getHomeCommunityCircle() {
    const data =
      await this.CommunityCircleRepository.createQueryBuilder(
        'CommunityCircle',
      ).getMany();

    const dataMeger = async () => {
      const [CommunityCircleIcon, CommunityCircleData] = await Promise.all([
        // 获取oss图片列表
        this.ossService.listImagesInFolder('uniappimg/Home/CommunityCircle/'),
        // 获取数据库数据
        data,
      ]);

      const dataMeger = CommunityCircleData.map((record, index) => ({
        CircleId: record.CircleId,
        CircleTitle: record.CircleTitle,
        CircleIcon:
          record.CircleId === 1
            ? CommunityCircleIcon[CommunityCircleIcon.length - 1]
            : CommunityCircleIcon[index - 1],
      }));
      return dataMeger;
    };
    return dataMeger();
  }
  // 获取当前我的排名数据
  async getCommunityList() {
    const data =
      await this.CommunityListRepository.createQueryBuilder(
        'CommunityList',
      ).getMany();
    const dataMeger = async () => {
      const [CommunityListImg, CommonImg, CommunityListData] =
        await Promise.all([
          // 获取oss图片列表
          this.ossService.listImagesInFolder('uniappimg/Home/CommunityList/'),
          // 获取公共图片
          this.ossService.listImagesInFolder(
            'uniappimg/CommonImg/RightArrows.svg',
          ),
          // 数据
          data,
        ]);
      const CommunityListDataMeger = CommunityListData.map((record, index) => ({
        ListId: record.ListId,
        ListTitle: record.ListTitle,
        ListSmallTitle: record.ListSmallTitle,
        ListLeftImg: CommunityListImg[index],
        ListRightImg: CommonImg[index],
      }));
      return CommunityListDataMeger;
    };
    return dataMeger();
  }
  // 获取全部用户发布的动态信息
  async getCommunityDynamic(UserId: number) {
    const data =
      await this.CommunityUserDynamicTitleRepository.createQueryBuilder(
        'CommunityUserDynamicTitleRepository',
      )
        .where(
          'CommunityUserDynamicTitleRepository.DynamicUserId = :DynamicUserId',
          {
            DynamicUserId: UserId,
          },
        )
        .leftJoinAndSelect(
          'CommunityUserDynamicTitleRepository.DynamicExerciseLog',
          'DynamicExerciseLogAlias',
          'DATE(CommunityUserDynamicTitleRepository.DynamicTime) = DATE(DynamicExerciseLogAlias.Time)',
        )

        .leftJoinAndSelect(
          'CommunityUserDynamicTitleRepository.DynamicEvaluate',
          'DynamicEvaluateAlias',
          'DATE(CommunityUserDynamicTitleRepository.DynamicTime) = DATE(DynamicEvaluateAlias.CommentTime)',
        )
        .orderBy('CommunityUserDynamicTitleRepository.DynamicId', 'ASC')
        .getMany();
    // 合并作者内容分享(图片或视频)
    const AuthorContentSharing =
      await this.CommunityUserDynamicAuthorContentSharingRepository.createQueryBuilder(
        'CommunityUserDynamicAuthorContentSharingRepository',
      )
        .where(
          'CommunityUserDynamicAuthorContentSharingRepository.AuthorContentSharingId = :AuthorContentSharingId',
          { AuthorContentSharingId: UserId },
        )
        .getMany();
    // 作者内容分享合并图片
    const AuthorContentSharingMeger = async () => {
      const [data, ossTime] = await Promise.all([
        AuthorContentSharing,
        // 获取图片数据详细信息
        this.ossService.getImageDetails(
          `uniappimg/Home/CommunityUserDynamic/Img/${UserId}_`,
        ),
      ]);
      // 获取与阿里云服务器OSS图片相同时间的日期
      const NewAuthorContentMeger = data.map((item) => {
        // 查询相同时间
        const NewOssTime = ossTime.filter((it) => {
          if (
            dayjs(String(it.lastModified)).format('YYYY-MM-DD') ===
            dayjs(item.AuthorContentSharingTime).format('YYYY-MM-DD')
          ) {
            return it;
          }
        });
        // 按照大到小时间排序
        NewOssTime.sort((a, b) => {
          return Number(b.lastModified) - Number(a.lastModified);
        });
        // 合并数据
        item.Content1 = NewOssTime[0]?.url || '';
        item.Content2 = NewOssTime[1]?.url || '';
        item.Content3 = NewOssTime[2]?.url || '';
        item.Content4 = NewOssTime[3]?.url || '';
        item.Content5 = NewOssTime[4]?.url || '';
        return item;
      });

      return NewAuthorContentMeger;
    };
    const NewAuthorData = await AuthorContentSharingMeger();
    // 循环子排序
    data.forEach((item) => {
      // 运动日志按 UserId 升序
      if (item.DynamicExerciseLog?.length) {
        item.DynamicExerciseLog.sort(
          (a, b) => new Date(a.Time).getTime() - new Date(b.Time).getTime(),
        );
      }
      // 评价按 CommentId 升序
      if (item.DynamicEvaluate?.length) {
        item.DynamicEvaluate.sort(
          (a, b) =>
            new Date(a.CommentTime).getTime() -
            new Date(b.CommentTime).getTime(),
        );
      }
    });
    // 获取动态图片
    const dataMegerResult = await dataMeger(
      this.CommunityUserDynamicImgRepository,
      this.CommunityUserDynamicImgChildRepository,
      this.ossService,
    );
    // 返回组合数据
    const NewData = data.map((item) => {
      return {
        ...item,
        DynamicImg: dataMegerResult,
        DynamicAuthorContentSharing: NewAuthorData,
      };
    });

    return NewData;
  }
  // 获取广告信息
  async getCommunityAdvertising(UserId: number) {
    // 广告数据
    const data = this.CommunityAdvertisingRepository.createQueryBuilder(
      'CommunityAdvertisingRepository',
    )
      .where(
        'CommunityAdvertisingRepository.AdvertisingSignId = :AdvertisingSignId',
        { AdvertisingSignId: UserId },
      )
      .getMany();
    const resolvedData = await data;
    if (resolvedData.length < 1 || !resolvedData) {
      throw new HttpException('暂无广告数据', 404);
    }
    // 用户信息数据
    const userInfo = await this.UniappUserInfoRepository.createQueryBuilder(
      'UniappUserInfo',
    )
      .where('UniappUserInfo.id = :id', { id: UserId })
      .getOne();
    // 合并完整数据
    const AdvertisingMeger = async () => {
      const [Advertising, oss] = await Promise.all([
        data,
        await this.ossService.listImagesInFolder(
          `uniappimg/Home/CommunityAdvertising/${UserId}.webp`,
        ),
      ]);
      // 合并
      const newData = Advertising.map((item, index) => {
        item.AdvertisingContent = oss[index] || '';
        return item;
      });
      return newData;
    };
    // 获取用户头像
    const oss = await this.ossService.listImagesInFolder(
      `uniappimg/User/UserAvatar/${UserId}.webp`,
    );
    // 返回完整数据
    const n = AdvertisingMeger();
    return {
      id: userInfo?.id,
      username: userInfo?.UserName,
      avatar: oss[0] || '',
      Advertising: await n,
    };
  }
  // 首页推荐
  async getRecommendData() {
    // 获取推荐数据
    const RecommendRepository =
      await this.RecommendRepository.createQueryBuilder(
        'RecommendRepository',
      ).getMany();
    // 获取用户信息数据
    const UserInfo =
      await this.UniappUserInfoRepository.createQueryBuilder(
        'UniappUserInfo',
      ).getMany();

    // 合并推荐数据与图片
    const RecommendMeger = async () => {
      const result = await Promise.all(
        RecommendRepository.map(async (item, index) => {
          const user = UserInfo.find((it) => item.UserId === it.id);
          if (user) {
            // 生成随机数并选择
            const options = ['run', 'IndoorRunning'];
            const randomIndex = Math.floor(Math.random() * options.length);
            const result = options[randomIndex];
            // 异步获取图片
            const UserAvatarImg = await this.ossService.listImagesInFolder(
              `uniappimg/User/UserAvatar/${user.id}.webp`,
            );
            // 获取RecommendContent图片或视频内容
            const RecommendContent = await this.ossService.listImagesInFolder(
              `uniappimg/Home/Recommend/RecommendContent/DefaultContent/${index}.webp`,
            );
            // 获取广告小图标
            const AdvertisingIcon = await this.ossService.listImagesInFolder(
              `uniappimg/CommonImg/${result}.svg`,
            );
            // 获取小广告图标
            const LittleAdvertisingIcon =
              await this.ossService.listImagesInFolder(
                `uniappimg/Home/Recommend/HighGrade/1.webp`,
              );
            // 右侧加入练习图标
            const JoinPractice = await this.ossService.listImagesInFolder(
              `uniappimg/CommonImg/join.svg`,
            );
            return {
              ...item,
              RecommendUserName: user.UserName,
              RecommendUserAvatar: UserAvatarImg,
              RecommendContent: RecommendContent[index],
              RecommendIcon: item.CategoryId === 2 ? AdvertisingIcon : '',
              AdletImg: item.AdletTitle ? LittleAdvertisingIcon : '',
              AdletRightIcon: JoinPractice,
            };
          }
          return item; // 如果没有匹配的用户，返回原项目
        }),
      );
      return result;
    };
    return await RecommendMeger();
  }
  // 首页推荐导航数据
  async getRecommendNavigation() {
    // 获取导航Title
    const getRecommendNavigationData =
      await this.RecommendNavigationRepository.createQueryBuilder(
        'RecommendNavigation',
      ).getMany();
    // 合并数据
    const RecommendNavigationMerge = async () => {
      const [data, OssImg] = await Promise.all([
        // 数据
        getRecommendNavigationData,
        // 图片
        this.ossService.listImagesInFolder(`uniappimg/CommonImg/hot.svg`),
      ]);
      // 组合
      const newData = data.map((item) => ({
        ...item,
        img: item.img == 'true' ? OssImg[0] : '',
      }));
      return newData;
    };
    return await RecommendNavigationMerge();
  }
  // 获取课程导航数据
  async getCourseNavigate() {
    // 获取数据
    const getCourseNavigateData =
      await this.CourseNavigateRepository.createQueryBuilder(
        'CourseNavigate',
      ).getMany();
    // 合并
    const CourseNavigateMerge = async () => {
      const [CourseNavigateData, Img] = await Promise.all([
        // 数据
        getCourseNavigateData,
        // 图片
        this.ossService.listImagesInFolder(`uniappimg/Home/Course/navigation/`),
      ]);
      return CourseNavigateData.map((item, index) => ({
        ...item,
        NavigateImg: Img[index],
      }));
    };
    return await CourseNavigateMerge();
  }
  // 获取课程选项Title
  async getCourseSelect() {
    // 获取课程选项数据
    const CourseSelectData =
      await this.CourseSelectRepository.createQueryBuilder(
        'CourseSelect',
      ).getMany();
    // 合并
    const CourseSelectMerge = async () => {
      // 获取指定的对应图标
      const arr = [
        'like',
        'dance',
        'IndoorRunning',
        'riding',
        'run',
        'pectorales',
      ];
      // 组合
      const [CourseSelectDatas, Img] = await Promise.all([
        // 数据
        CourseSelectData,
        // 图片
        arr.map((item) => {
          return this.ossService.listImagesInFolder(
            `uniappimg/CommonImg/${item}.svg`,
          );
        }),
      ]);
      // 解构promise
      const deconstruction = await Promise.all(Img);
      return CourseSelectDatas.map((item, index) => ({
        ...item,
        SelectIcon: deconstruction[index],
      }));
    };

    return await CourseSelectMerge();
  }
  // 课程精选
  async CourseSelectChoicenes() {
    // 获取课程精选数据
    const CourseSelectChoicenesData =
      await this.CourseSelectChoicenesRepository.createQueryBuilder(
        'CourseSelectChoicenesRepository',
      ).getMany();
    // 获取用户信息
    const UserInfo =
      await this.UniappUserInfoRepository.createQueryBuilder(
        'UserInfo',
      ).getMany();
    // 合并
    const CourseSelectChoicenesMerge = async () => {
      // 组合
      const [data, OssImg] = await Promise.all([
        // 数据
        CourseSelectChoicenesData,
        // 图片
        Promise.all(
          CourseSelectChoicenesData.map((item) =>
            this.ossService.listImagesInFolder(
              `uniappimg/Home/Course/CourseContent/choiceness/${item.SelectChoicenesId}.webp`,
            ),
          ),
        ).then((results) => results.flat()),
      ]);
      // 组合2
      const processedData = await Promise.all(
        data.map(async (item, index) => {
          const user = UserInfo.find((ite) => ite.id === item.UserId);

          let userAvatar: string | null = null;
          if (user) {
            try {
              const avatarResult = await this.ossService.listImagesInFolder(
                `uniappimg/User/UserAvatar/${user.id}.webp`,
              );
              userAvatar = Array.isArray(avatarResult)
                ? avatarResult[0]
                : avatarResult;
            } catch (error) {
              userAvatar = null;
              return new HttpException(`${error}`, 400);
            }
          }

          return {
            ...item, // 确保这里包含了原始 item 的所有属性，包括 id
            SelectChoicenesContent: OssImg[index],
            SelectChoicenesUserName: user?.UserName || null,
            SelectChoicenesAvatar: userAvatar,
          };
        }),
      );

      return processedData;
    };
    return await CourseSelectChoicenesMerge();
  }

  // 获取自定义训练计划
  async PlanCustom() {
    // 获取数据
    const PlanCustomData =
      await this.PlanCustomRepository.createQueryBuilder(
        'PlanCustom',
      ).getMany();
    // 合并
    const PlanCustomDataMerge = async () => {
      const [data, OssImg] = await Promise.all([
        //数据
        PlanCustomData,
        //图片
        this.ossService.listImagesInFolder(
          `uniappimg/Home/Plan/CustomPlan/1.webp`,
        ),
      ]);
      return data.map((item) => ({
        ...item,
        img: OssImg[0],
      }));
    };
    return await PlanCustomDataMerge();
  }

  // 获取会员训练计划
  async getPlanMember() {
    const PlanMemberData =
      this.PlanMemberRepository.createQueryBuilder('PlanMember').getMany();
    // 合并
    const PlanMemberDataMerge = async () => {
      const [data, OssImg] = await Promise.all([
        // 数据
        PlanMemberData,
        // 图片
        (await PlanMemberData).map((item) => {
          return this.ossService.listImagesInFolder(
            `uniappimg/Home/Plan/VipPlan/${item.Id}.webp`,
          );
        }),
      ]);
      const newOssImg = await Promise.all(OssImg);
      return data.map((item, index) => ({
        ...item,
        Img: newOssImg[index],
      }));
    };
    return await PlanMemberDataMerge();
  }

  // 获取所有训练内容
  async PlanSelect() {
    const PlanSelectData =
      await this.PlanSelectRepository.createQueryBuilder(
        'PlanSelect',
      ).getMany();
    // 合并
    const PlanSelectMerge = async () => {
      const [data, OssImg] = await Promise.all([
        // 数据
        PlanSelectData,
        // 图片
        PlanSelectData.map((item) => {
          return this.ossService.listImagesInFolder(
            `uniappimg/Home/Plan/AllPlan/${item.SelectId}.webp`,
          );
        }),
      ]);
      const newOssImg = await Promise.all(OssImg);
      return data.map((item, index) => ({
        ...item,
        PlanSelectImg: newOssImg[index],
      }));
    };
    return await PlanSelectMerge();
  }
  // 获取奖牌导航Title
  async MedalNavigation() {
    // 数据
    const MedalNavigationData =
      await this.MedalNavigationRepository.createQueryBuilder(
        'MedalNavigation',
      ).getMany();
    //  合并
    const MedalNavigationMerge = async () => {
      // 组合
      const [data, OssImg] = await Promise.all([
        // 数据
        MedalNavigationData,
        // 图片
        MedalNavigationData.map((item) => {
          return this.ossService.listImagesInFolder(
            `uniappimg/Home/Medal/Navigation/${item.MedalNavigationId}.webp`,
          );
        }),
      ]);
      const newOssImg = await Promise.all(OssImg);
      const newData = data.map((item, index) => ({
        ...item,
        MedalNavigationIcon: newOssImg[index],
      }));
      return newData;
    };
    return await MedalNavigationMerge();
  }
  // 获取奖牌选项Title
  async MedalSelect() {
    const MedalSelectData =
      await this.MedalSelectRepository.createQueryBuilder(
        'MedalSelect',
      ).getMany();
    const MedalSelectMerge = async () => {
      // 组合
      const [data, OssImg] = await Promise.all([
        // 数据
        MedalSelectData,
        // 图片
        this.ossService.listImagesInFolder(`uniappimg/CommonImg/hot.svg`),
      ]);
      return data.map((item) => ({
        ...item,
        MedalSelectIcon: item.MedalSelectIcon == 'true' ? OssImg[0] : '',
      }));
    };
    return await MedalSelectMerge();
  }
  // 获取奖杯默认内容
  async Medal() {
    // 数据
    const MedalData =
      await this.MedalRepository.createQueryBuilder('Medal').getMany();
    // 合并
    const MedalMerge = async () => {
      const [data, OssImg] = await Promise.all([
        // 数据
        MedalData,
        // 图片
        MedalData.map((item) => {
          return this.ossService.listImagesInFolder(
            `uniappimg/Home/Medal/MedalContent/DefaultContent/${item.MedalId}.webp`,
          );
        }),
      ]);
      const newOssImg = await Promise.all(OssImg);
      return data.map((item, index) => ({
        ...item,
        MedalContent: newOssImg[index],
      }));
    };
    return await MedalMerge();
  }
  // 获取比赛导航Title
  async GameNavigate() {
    const GameNavigateData =
      await this.GameNavigateRepository.createQueryBuilder(
        'GameNavigate',
      ).getMany();
    // 合并
    const GameNavigateMerge = async () => {
      const [data, OssImg] = await Promise.all([
        // 数据
        GameNavigateData,
        // 图片
        GameNavigateData.map((item) => {
          return this.ossService.listImagesInFolder(
            `uniappimg/Home/Game/Navigation/${item.GameNavigateId}.webp`,
          );
        }),
      ]);
      const newOssImg = await Promise.all(OssImg);
      return data.map((item, index) => ({
        ...item,
        GameNavigateImg: newOssImg[index],
      }));
    };
    return await GameNavigateMerge();
  }
  // 获取比赛选项Title
  async GameSelect() {
    const GameSelectData =
      await this.GameSelectRepository.createQueryBuilder(
        'GameSelect',
      ).getMany();
    // 合并
    const GameSelectMerge = async () => {
      const [data, OssImg] = await Promise.all([
        // 数据
        GameSelectData,
        // 图片

        this.ossService.listImagesInFolder(`uniappimg/CommonImg/hot.svg`),
      ]);
      return data.map((item) => ({
        ...item,
        GameSelectIcon: item.GameSelectIcon == 'true' ? OssImg[0] : '',
      }));
    };
    return await GameSelectMerge();
  }
  // 获取比赛默认内容
  async Game() {
    const GameData =
      await this.GameRepository.createQueryBuilder('Game').getMany();
    // 获取用户信息
    const UserInfo =
      await this.UniappUserInfoRepository.createQueryBuilder(
        'UserInfo',
      ).getMany();
    // 合并
    const GameMerge = async () => {
      // 组合
      const [data, OssImg] = await Promise.all([
        // 数据
        GameData,
        // 图片
        Promise.all(
          GameData.map((item) =>
            this.ossService.listImagesInFolder(
              `uniappimg/Home/Game/GameContent/${item.GameId}.webp`,
            ),
          ),
        ).then((results) => results.flat()),
      ]);
      // 组合2
      const processedData = await Promise.all(
        data.map(async (item, index) => {
          const user = UserInfo.find((ite) => ite.id === item.GameId);

          let userAvatar: string | null = null;
          if (user) {
            try {
              const avatarResult = await this.ossService.listImagesInFolder(
                `uniappimg/User/UserAvatar/${user.id}.webp`,
              );
              userAvatar = Array.isArray(avatarResult)
                ? avatarResult[0]
                : avatarResult;
            } catch (error) {
              userAvatar = null;
              return new HttpException(`${error}`, 400);
            }
          }

          return {
            ...item, // 确保这里包含了原始 item 的所有属性，包括 id
            GameContent: OssImg[index],
            GameUserName: user?.UserName || null,
            GameUserAvatar: userAvatar,
          };
        }),
      );

      return processedData;
    };
    return await GameMerge();
  }
}
