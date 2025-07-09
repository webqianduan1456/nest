import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfo } from '../Entity/User/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RedisService } from '../redis';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { Friend } from '../Entity/User/Friend.entity';
import { UserChatInfo } from '../Entity/User/UserChatInfo.entity';
import { Message } from './type';
interface n {
  userid?: number;
  oppositeId?: number;
  active?: number;
}
@Injectable()
export class UserService {
  constructor(
    // ----------表单----------
    // 用户信息
    @InjectRepository(UserInfo, 'user')
    private readonly userRepository: Repository<UserInfo>,
    // 用户朋友列表
    @InjectRepository(Friend, 'user')
    private readonly FriendRepository: Repository<Friend>,
    // 用户聊天信息
    @InjectRepository(UserChatInfo, 'user')
    private readonly UserChatInfoRepository: Repository<UserChatInfo>,

    // redis缓存
    private readonly redisService: RedisService,
    // 创建队列
    @InjectQueue('applyFor')
    private readonly applyQueue: Queue,
  ) {}
  // 首次登录(auto保护)
  async login(Body: { username: string; userpassword: string }) {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username: Body.username })
      .andWhere('user.username = :username', {
        userpassword: Body.userpassword,
      })
      .getMany();
    if (!users[0]?.username && !users[0]?.userpassword) {
      // 账号或密码不存在
      throw new HttpException('用户名或密码错误', HttpStatus.NOT_FOUND);
    }

    // 用户存在返回
    return {
      id: users[0].id,
      username: users[0].username,
      avatar: users[0].avatar,
      userpassword: users[0].userpassword,
    };
  }
  // 注册
  async register(Body: {
    username: string;
    userpassword: string;
    phone: string;
  }) {
    const hashPassword = await bcrypt.hash(Body.userpassword, 10);
    const register = await this.userRepository
      .createQueryBuilder('register')
      .where('register.username = :username', { username: Body.username })
      .getOne();
    if (register?.username === Body.username) {
      return {
        code: 409,
        message: '用户名重复!',
      };
    }
    const newBody = {
      ...Body,
      userpassword: hashPassword,
    };
    await this.userRepository.insert({ ...newBody });
    return {
      code: 200,
      message: '注册成功!',
    };
  }
  // 查询用户
  async FindUser(username: string) {
    const FindUsers = await this.userRepository
      .createQueryBuilder('FindUser')
      .where('FindUser.username = :username', { username })
      .getMany();

    if (FindUsers.length <= 0) {
      throw new HttpException('未找到', HttpStatus.BAD_REQUEST);
    }
    return {
      id: FindUsers[0].id,
      username: FindUsers[0].username,
      url: FindUsers[0].avatar,
    };
  }
  // 好友申请表
  async ApplicationList(data: { oppositeId: number; userid: number }) {
    const apply = await this.FriendRepository.createQueryBuilder('Friend')
      .where('Friend.oppositeId = :oppositeId', { oppositeId: data.oppositeId })
      .andWhere('Friend.userid = :userid', { userid: data.userid })
      .andWhere('Friend.active = :active', { active: 0 })
      .getOne();
    if (!data && !apply) return '未传值或数据格式不对';
    const Application = await this.redisService.get(
      `User${data?.oppositeId}_User${data?.userid}`,
    );
    // 检查redis是否有相同请求没有就添加
    if (!Application) {
      // 缓存数据redis(有效7天)
      await this.redisService.set(
        `User${data.oppositeId}_User${data.userid}`,
        data,
        300,
      );
      const time = await this.redisService.ttl(
        `User${data.oppositeId}_User${data.userid}`,
      );
      // 添加延迟任务到队列
      await this.applyQueue.add(
        'apply',
        {
          oppositeId: data.oppositeId,
          userid: data.userid,
        },
        {
          delay: (time - 2) * 1000,
          attempts: 2,
          removeOnComplete: true,
          jobId: `apply_${data.oppositeId}_${data.userid}`,
        },
      );
    } else {
      return {
        code: 404,
        message: '请不要频繁发送请求!',
      };
    }
  }
  // 将redis里面的好友申请表存在数据库
  async CreateApplicationList(
    oppositeId: number,
    userid: number,
    // 当前用户
    active?: number,
    username?: string,
  ) {
    const Applications = await this.FriendRepository.createQueryBuilder(
      'Friend',
    )
      .where('Friend.oppositeId = :oppositeId', { oppositeId })
      .andWhere('Friend.userid = :userid', { userid })
      .andWhere('Friend.active = :active', { active: 1 })
      .getOne();
    //  将redis的用户申请的数据存在数据库
    const redisDate = async (active: number | null = null) => {
      //  获取redis身上的数据
      const data: n | null = (await this.redisService.get(
        `User${oppositeId}_User${userid}`,
      ))
        ? await this.redisService.get(`User${oppositeId}_User${userid}`)
        : null;
      //  存好友
      if (active === 1) {
        const getApply = await this.FriendRepository.createQueryBuilder(
          'Friend',
        )
          .where('Friend.oppositeId = :oppositeId', { oppositeId })
          .andWhere('Friend.userid = :userid', { userid })
          .andWhere('Friend.active = :active', { active: 0 })
          .getOne();

        if (data) {
          // 用户A与用户B互存加入到好友列表
          await this.FriendRepository.insert({
            ...data,
            active: 1,
            oppositeId: data.oppositeId,
            userid: data.userid,
          });
          await this.FriendRepository.insert({
            ...data,
            active: 1,
            username: username,
            oppositeId: data.userid,
            userid: data.oppositeId,
          });
        }
        if (Object.keys(getApply || {}).length > 0 && getApply) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { id, ...result } = getApply;
          // 用户A与用户B互存加入到好友列表
          await this.FriendRepository.insert({
            ...result,
            active: 1,
            oppositeId: getApply.oppositeId,
            userid: getApply.userid,
          });
          await this.FriendRepository.insert({
            ...result,
            active: 1,
            username: username,
            oppositeId: getApply.userid,
            userid: getApply.oppositeId,
          });
          // 删除
          await this.FriendRepository.remove(getApply);
        }
      }
      // 存申请
      if (active == null || Number(active) === 0 || !active) {
        if (data) {
          await this.FriendRepository.insert({
            ...data,
            active: 0,
            oppositeId: data.oppositeId,
            userid: data.userid,
          });
        }
      }
      // 删除延迟取消任务(Bull队列任务)
      await this.applyQueue.removeJobs(`apply_${oppositeId}_${userid}`);
      //  删除指定申请表的数据
      await this.redisService.del(`User${oppositeId}_User${userid}`);
    };
    if (Number(active) == 1) {
      if (!Applications) {
        await redisDate(Number(active));
      }
      return {
        code: 200,
        message: '同意成功',
      };
    }
    if (active == null || Number(active) === 0) {
      const Application = await this.FriendRepository.createQueryBuilder(
        'Friend',
      )
        .where('Friend.oppositeId = :oppositeId', { oppositeId })
        .andWhere('Friend.userid = :userid', { userid })
        .getOne();
      //  去重复申请数据
      if (Application?.id) return;
      await redisDate();
    }
  }
  // 展示好友列表
  async FindFriendList(userid: number, active: number) {
    // 返回申请列表
    if (Number(active) === 0) {
      const Application = await this.FriendRepository.createQueryBuilder(
        'Friend',
      )
        .where('Friend.active = :active', { active })
        .andWhere('Friend.userid = :userid', { userid })
        .getMany();

      // 有值返回
      if (Application.length > 0) {
        return Application;
      } else {
        return [];
      }
    }
    // 返回朋友列表
    if (Number(active) === 1) {
      const Application = await this.FriendRepository.createQueryBuilder(
        'Friend',
      )
        .where('Friend.active = :active', { active })
        .andWhere('Friend.userid = :userid', { userid })
        .getMany();
      // 合并数据
      const newData = Application.map((item) => {
        return {
          username: item.username,
          avatarUrl: item.avatarUrl,
          oppositeId: item.oppositeId,
        };
      });
      if (Application.length > 0) {
        return newData;
      } else {
        return [];
      }
    }
  }
  // 拒绝好友
  async DeleteFriend(userid: number, oppositeId: number) {
    const DeleteFriend = await this.FriendRepository.createQueryBuilder(
      'DeleteFriend',
    )
      .where('DeleteFriend.userid = :userid', { userid })
      .andWhere('DeleteFriend.oppositeId = :oppositeId', { oppositeId })
      .andWhere('DeleteFriend.active = :active', { active: 0 })
      .getOne();
    if (DeleteFriend) {
      await this.FriendRepository.remove(DeleteFriend);
      return {
        code: 200,
        message: '删除成功',
      };
    }
    //  删除指定申请表的数据
    await this.redisService.del(`User${oppositeId}_User${userid}`);
    // 删除延迟取消任务(Bull队列任务)
    await this.applyQueue.removeJobs(`apply_${oppositeId}_${userid}`);

    return {
      code: 404,
      message: '未找到数据',
    };
  }
  // 获取用户聊天信息
  async getChatMessage(room: number) {
    const chat = await this.UserChatInfoRepository.createQueryBuilder('chat')
      .where('chat.room = :room', { room })
      .orderBy('chat.time', 'ASC')
      .getMany();
    if (chat.length > 0) {
      return chat;
    }
    return {
      code: 404,
      message: '没有相关数据',
    };
  }
  // 添加用户聊天信息
  async createChatMessage(infoData: Array<Message>) {
    if (Object.keys(infoData).length > 0) {
      await this.UserChatInfoRepository.insert([...infoData]);
    }
  }
}
