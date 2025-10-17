import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UniappUserInfo } from '../../UniappEntity/user/UserInfo.entity';
import * as bcrypt from 'bcrypt';
import { OssService } from 'src/OSS/oss';

@Injectable()
export class UniappUserService {
  constructor(
    // oss图片服务
    private readonly ossService: OssService,
    // 用户实例
    @InjectRepository(UniappUserInfo, 'uniapp-userinfo')
    private readonly UniappUserInfoRepository: Repository<UniappUserInfo>,
  ) {}
  //  注册
  async Regis(Body: { User: string; Password: string; Phone: string }) {
    // 检查用户是否已存在
    const UniappUserInfo =
      await this.UniappUserInfoRepository.createQueryBuilder('UserInfo')
        .where('UserInfo.UserName = :UserName', { UserName: Body.User })
        .andWhere('UserInfo.Password = :Password', {
          Password: Body.Password,
        })
        .getOne();
    // 如果用户已存在，返回提示信息
    if (UniappUserInfo) return { code: 0, msg: '用户已存在' };
    // 否则，密码转化为hash再插入新用户
    const hashPassword = await bcrypt.hash(Body.Password, 10);
    const newUser = await this.UniappUserInfoRepository.insert({
      UserName: Body.User,
      Password: hashPassword,
      Phone: Body.Phone,
    });
    // 如果插入成功，返回成功信息否则失败
    if (newUser) {
      return { code: 200, msg: '注册成功' };
    } else {
      return { code: 400, msg: '注册失败' };
    }
  }
  // 登录
  async Login(Body: { username: string; userpassword: string }) {
    console.log(Body.username, Body.userpassword);

    // 查询用户信息
    const user = await this.UniappUserInfoRepository.createQueryBuilder(
      'UserInfo',
    )
      .where('UserInfo.UserName = :UserName', { UserName: Body.username })
      .getOne();
    // 获取用户头像
    const oss = await this.ossService.listImagesInFolder(
      `uniappimg/User/UserAvatar/${user?.id}.webp`,
    );

    // 验证密码和用户名
    if (
      !user?.UserName ||
      !(await bcrypt.compare(Body.userpassword, user.Password))
    ) {
      throw new HttpException('用户名或密码错误', HttpStatus.NOT_FOUND);
    } else {
      return {
        id: user.id,
        username: user.UserName,
        avatar: oss[0] || '',
        userpassword: user.Password,
      };
    }
  }
}
