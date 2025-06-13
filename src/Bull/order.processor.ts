// order.processor.ts
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { OrderService } from '../Order/order.service';

@Processor('order')
export class OrderProcessor {
  constructor(private readonly orderService: OrderService) {}

  @Process('cancelOrder')
  async handleCancelOrder(job: Job<{ houseId: number }>) {
    const { houseId } = job.data;
    // 调用删除订单逻辑
    await this.orderService.deleteOrder(houseId);
  }
}
