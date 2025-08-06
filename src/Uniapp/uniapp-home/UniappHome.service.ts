import { Injectable } from '@nestjs/common';

@Injectable()
export class UniAppHomeService {
  constructor() {}

  getHomeData() {
    // Logic to fetch home data for UniApp
    return { message: 'Home data for UniApp' };
  }
}
