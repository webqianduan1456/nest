import { Module } from '@nestjs/common';
import { UserController } from './User.controller';
import { UserService } from './User.service';
import { User } from 'src/Entity/User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OSSProvider } from '../common/oss.provider';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, OSSProvider],
  exports: [UserService, OSSProvider],
})
export class UserModule {}
