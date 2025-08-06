import { Module } from '@nestjs/common';
import { UniappUserController } from './UniappUser.controller';
import { UniappUserService } from './UniappUser.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniappUserInfo } from '../../Entity/uniapp/user/UserInfo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UniappUserInfo], 'uniapp-userinfo')],
  controllers: [UniappUserController],
  providers: [UniappUserService],
  exports: [UniappUserService],
})
export class UniappUserModule {}
