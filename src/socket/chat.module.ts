import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { RedisService } from '../redis';

@Module({
  providers: [ChatGateway, RedisService], // 注册网关到模块
})
export class ChatModule {}
