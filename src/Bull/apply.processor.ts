// order.processor.ts
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { UserService } from '../User/User.service';
import { RedisService } from '../redis';

@Processor('applyFor')
export class applyProcessor {
  constructor(
    private readonly UserServiceS: UserService, // redis缓存
    private readonly redisService: RedisService,
  ) {}

  @Process('apply')
  async handleCancelOrder(job: Job<{ oppositeId: number; userid: number }>) {
    const { oppositeId, userid } = job.data;
    // 添加数据
    await this.UserServiceS.CreateApplicationList(oppositeId, userid);
  }
}
