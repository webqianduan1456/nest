import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../User/User.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UniappUserService } from '../Uniapp/Uniapp-user/UniappUser.service';
@Injectable()
export class AuthService {
  constructor(
    private UserServices: UserService,
    private UniappUserServices: UniappUserService,
    private jwtService: JwtService,
  ) {}
  // 判断第一次的用户信息
  // pc端
  async validateUser(username: string, userpassword: string) {
    // pc端
    const user = await this.UserServices.login({
      username,
      userpassword,
    });

    // 判断用户传入的数据与数据库里的数据做对比
    const match = await bcrypt.compare(userpassword, user.userpassword);
    if (match) {
      // 返回用户信息
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { userpassword, ...result } = user;
      return result;
    } else {
      throw new HttpException('密码错误', HttpStatus.NOT_FOUND);
    }
  }
  // 移动端
  async validateUserUniapp(username: string, userpassword: string) {
    // uniapp
    const user = await this.UniappUserServices.Login({
      username,
      userpassword,
    });

    // 判断用户传入的数据与数据库里的数据做对比
    const match = await bcrypt.compare(userpassword, user.userpassword);
    if (match) {
      // 返回用户信息
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { userpassword, ...result } = user;
      return result;
    } else {
      throw new HttpException('密码错误', HttpStatus.NOT_FOUND);
    }
  }

  // 第二次进来返回加密token
  login(user: { id: number; username: string; avatar?: string }) {
    const payload = {
      id: user.id,
      username: user.username,
    };
    return {
      //生成Token
      access_token: this.jwtService.sign(payload),
      id: user.id,
      avatar: user.avatar,
      username: user.username,
    };
  }
}
