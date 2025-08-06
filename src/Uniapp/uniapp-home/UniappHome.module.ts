import { Module } from '@nestjs/common';
import { UniAppHomeController } from './UniappHome.controller';
import { UniAppHomeService } from './UniappHome.service';

@Module({
  imports: [],
  controllers: [UniAppHomeController],
  providers: [UniAppHomeService],
})
export class UniAppHomeModule {}
