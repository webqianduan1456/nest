import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllOrder } from '../Entity/Order/order.entity';
import { RedisService } from '../redis';
import { BullModule } from '@nestjs/bull/dist';
import { OrderProcessor } from '../Bull/order.processor';
@Module({
  imports: [
    TypeOrmModule.forFeature([AllOrder], 'order'),
    // BUll连接redis
    BullModule.forRoot({
      redis: {
        host: '47.122.47.101',
        port: 6379,
        password: '1989315788',
        maxRetriesPerRequest: 10,
        db: 0,
      },
    }),
    BullModule.registerQueue({ name: 'order' }),
  ],
  controllers: [OrderController],
  providers: [OrderService, RedisService, OrderProcessor],
})
export class OrderModule {}
