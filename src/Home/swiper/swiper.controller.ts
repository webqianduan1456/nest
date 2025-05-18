import { Controller, Get } from '@nestjs/common';
import { SwiperService } from './swiper.service';

@Controller('swiper')
export class SwiperController {
  constructor(private readonly swiperService: SwiperService) {}

  @Get('img')
  GetSwiperImg() {
    return this.swiperService.getSwiperImg();
  }
}
