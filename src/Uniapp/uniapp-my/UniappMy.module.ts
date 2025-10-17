import { Module } from '@nestjs/common';
import { UniappMyController } from './UniappMy.controller';
import { UniappMyService } from './UniappMy.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelpNavigate } from '../../UniappEntity/UniappMy/HelpNavigate.entity';
import { UserInfoIcon } from '../../UniappEntity/UniappMy/UserInfoIcon.entity';
import { KeepData } from '../../UniappEntity/UniappMy/KeepData.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [HelpNavigate, KeepData, UserInfoIcon],
      'uniapp-my',
    ),
  ],
  controllers: [UniappMyController],
  providers: [UniappMyService],
})
export class UniappMyModule {}
