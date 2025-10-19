import { Repository } from 'typeorm';

export interface OssService {
  listImagesInFolder(folderPath: string): Promise<string[]>;
}

// 定义 CommunityUserDynamicImg 类型
export interface CommunityUserDynamicImg {
  AvatarImg?: string;
  ShareImg?: string;
  MoreImg?: string;
  BroadcastImg?: string;
  MessageImg?: string;
  StarImg?: string;
}

// 定义 CommunityUserDynamicImgChild 类型
export interface CommunityUserDynamicImgChild {
  ImgOne?: string;
  ImgTwo?: string;
  ImgThree?: string;
  ImgFour?: string;
  ImgFive?: string;
  ImgMore?: string;
}

const dataMeger = async (
  Img: Repository<any>,
  ChildImg: Repository<any>,
  oss: OssService,
) => {
  const [
    CommunityUserDynamicImgData,
    CommunityUserDynamicImgChildData,
    OssImg,
    AVatarImg,
    OssImgChild,
  ] = await Promise.all([
    // 获取 CommunityUserDynamicImg 数据
    (await Img.createQueryBuilder(
      'CommunityUserDynamicImg',
    ).getMany()) as CommunityUserDynamicImg[],
    // 获取 CommunityUserDynamicImgChild 数据
    (await ChildImg.createQueryBuilder(
      'CommunityUserDynamicImgChild',
    ).getMany()) as CommunityUserDynamicImgChild[],
    // 获取 CommunityUserDynamicImg 图片
    oss.listImagesInFolder('uniappimg/CommonImg/'),
    // 获取头像旁特殊标记
    oss.listImagesInFolder('uniappimg/User/UserAvatar/3.svg'),
    // 获取各种不同鼓舞评论图片
    oss.listImagesInFolder('uniappimg/Home/CommunityUserDynamic/Icon/'),
  ]);
  const dataChildMegerImgChild = CommunityUserDynamicImgData.map(
    (item, index) => {
      item.AvatarImg = AVatarImg[0];
      item.ShareImg = OssImg[index + 16];
      item.MoreImg = OssImg[index + 12];
      item.BroadcastImg = OssImg[index + 11];
      item.MessageImg = OssImg[index + 6];
      item.StarImg = OssImg[index + 8];
      return item;
    },
  );
  const dataChildMegerImg = CommunityUserDynamicImgChildData.map(
    (item, index) => {
      item.ImgOne = OssImgChild[index];
      item.ImgTwo = OssImgChild[index + 1];
      item.ImgThree = OssImgChild[index + 2];
      item.ImgFour = OssImgChild[index + 3];
      item.ImgFive = OssImgChild[index + 4];
      item.ImgMore = OssImg[index + 12];
      return item;
    },
  );
  const Meger = [
    {
      img: dataChildMegerImg,
      imgChild: dataChildMegerImgChild,
    },
  ];
  return Meger;
};

export { dataMeger };
