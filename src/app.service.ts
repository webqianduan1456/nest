import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      id: 1,
      username: 'admin',
      password: 'admin',
      email: '123456',
    };
  }
}
