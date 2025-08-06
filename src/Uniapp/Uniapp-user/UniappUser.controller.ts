import { Body, Controller, Post } from '@nestjs/common';
import { UniappUserService } from './UniappUser.service';

@Controller('UniappUser')
export class UniappUserController {
  constructor(private readonly UniappUserServices: UniappUserService) {}
  // 注册
  @Post('UniappRegis')
  Regis(@Body() Body: { User: string; Password: string; Phone: string }) {
    return this.UniappUserServices.Regis(Body);
  }
}
