import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { RedisService } from '../redis';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomMessage } from '../Entity/User/RoomMessage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomMessage], 'user'),
    BullModule.registerQueue({ name: 'applyFor' }),
  ],
  providers: [ChatGateway, RedisService], // 注册网关到模块
})
export class ChatModule {}
