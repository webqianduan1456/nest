import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { UserService } from './User.service';
import { Message } from './type';

@Controller('user')
export class UserController {
  constructor(private readonly UserServices: UserService) {}
  // 注册
  @Post('register')
  register(
    @Body() Body: { username: string; userpassword: string; phone: string },
  ) {
    return this.UserServices.register(Body);
  }
  //  查找用户
  @Get('FindUser')
  FindUser(@Query('username') username: string) {
    return this.UserServices.FindUser(username);
  }
  // 好友申请表
  @Post('ApplicationList')
  ApplicationList(@Body() data: { oppositeId: number; userid: number }) {
    return this.UserServices.ApplicationList(data);
  }
  // 展示好友列表
  @Get('FindFriendList')
  FindFriendList(
    @Query('userid') userid: number,
    @Query('active') active: number,
  ) {
    return this.UserServices.FindFriendList(userid, active);
  }
  // 拒绝好友
  @Post('DeleteFriend')
  DeleteFriend(
    @Body('userid') userid: number,
    @Body('oppositeId') oppositeId: number,
  ) {
    return this.UserServices.DeleteFriend(userid, oppositeId);
  }
  // 将redis里面的好友申请表存在数据库
  @Post('CreateApplicationList')
  CreateApplicationList(
    @Body('oppositeId') oppositeId: number = 0,
    @Body('userid') userid: number = 0,
    @Body('active') active: number,
    @Body('username') username: string,
  ) {
    return this.UserServices.CreateApplicationList(
      oppositeId,
      userid,
      active,
      username,
    );
  }
  // 获取用户聊天信息
  @Get('getChatMessage')
  getChatMessage(@Query('room') room: number) {
    return this.UserServices.getChatMessage(room);
  }
  // 添加用户聊天信息
  @Post('createChatMessage')
  createChatMessage(infoData: Array<Message>) {
    return this.UserServices.createChatMessage(infoData);
  }
}
