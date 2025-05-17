import { Module } from '@nestjs/common';
import { UserController } from './User.controller';
import { UserService } from './User.service';
import { User } from 'src/Entity/User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OssProvider } from '../core/oss';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, OssProvider],
  exports: [UserService, OssProvider],
})
export class UserModule {}
