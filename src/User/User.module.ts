import { Module } from '@nestjs/common';
import { UserService } from './User.service';
import { UserController } from './User.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfo } from '../Entity/User/user.entity';
import { UserChatInfo } from '../Entity/User/UserChatInfo.entity';
import { RedisService } from '../redis';
import { BullModule } from '@nestjs/bull';
import { Friend } from '../Entity/User/Friend.entity';
import { applyProcessor } from '../Bull/apply.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserInfo, UserChatInfo, Friend], 'user'),
    BullModule.registerQueue({ name: 'applyFor' }),
  ],
  controllers: [UserController],
  providers: [UserService, RedisService, applyProcessor],
  exports: [UserService],
})
export class UserModule {}
