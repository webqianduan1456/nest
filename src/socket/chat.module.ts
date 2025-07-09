import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { RedisService } from '../redis';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [BullModule.registerQueue({ name: 'applyFor' })],
  providers: [ChatGateway, RedisService], // 注册网关到模块
})
export class ChatModule {}
