import { Module } from '@nestjs/common';
import { UserController } from './User.controller';
import { UserService } from './User.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
