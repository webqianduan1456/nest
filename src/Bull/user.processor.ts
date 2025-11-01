// order.processor.ts
import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { UserService } from '../User/User.service';
import { RedisService } from '../redis';
import { Message } from '../User/type';

@Processor('applyFor')
export class applyProcessor {
  constructor(
    private readonly UserServiceS: UserService, // redis缓存
    private readonly redisService: RedisService,
    // 创建队列
    @InjectQueue('applyFor')
    private readonly applyQueue: Queue,
  ) {}
  // 将用户申请添加到数据库
  @Process('apply')
  async handleCancelApply(job: Job<{ oppositeId: number; userid: number }>) {
    const { oppositeId, userid } = job.data;
    await this.UserServiceS.CreateApplicationList(oppositeId, userid);
  }
  // 将用户发送的消息保存到数据库
  @Process('message')
  async handleCancelMessage(job: Job<{ roomId: number }>) {
    const { roomId } = job.data;
    const infoData: Array<Message> | null = await this.redisService.lrange(
      `Message${roomId}`,
      0,
      -1,
    );

    if (infoData) {
      // 将数据存到数据库
      await this.UserServiceS.createChatMessage(infoData);
      // 删除redis字段
      await this.redisService.del(`Message${roomId}`);
    }
  }
}
