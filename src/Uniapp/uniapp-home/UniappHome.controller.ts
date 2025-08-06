import { Controller, Get } from '@nestjs/common';
import { UniAppHomeService } from './UniappHome.service';

@Controller('UniAppHome')
export class UniAppHomeController {
  constructor(private readonly UniAppHomeServices: UniAppHomeService) {}

  @Get('getData')
  getHomeData() {
    return this.UniAppHomeServices.getHomeData();
  }
}
