import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisService } from '../redis';
import { BullModule } from '@nestjs/bull/dist';
import { OrderProcessor } from '../Bull/order.processor';
import { AllOrder } from '../Entity/Order/order.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([AllOrder], 'order'),
    BullModule.registerQueue({ name: 'order' }),
  ],
  controllers: [OrderController],
  providers: [OrderService, RedisService, OrderProcessor],
})
export class OrderModule {}
