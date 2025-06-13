import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { orderDataType } from './type/orderData';

@Controller('order')
export class OrderController {
  constructor(private readonly OrderServices: OrderService) {}
  // 获取所有订单
  @Get()
  findAll(@Query('Overall') Overall: number) {
    return this.OrderServices.findAllOrder(Overall);
  }
  // 获取近期订单
  @Get('Completed')
  findCompletedOrder() {
    return this.OrderServices.findCompletedOrder();
  }
  // 获取待支付订单
  @Get('Waiting')
  findWaitingOrder() {
    return this.OrderServices.findWaitingOrder();
  }
  // 创建订单
  @Post('CreateOrder')
  createOrder(@Body() OrderData: orderDataType) {
    // 判断当前数据是否存在
    if (Object.keys(OrderData).length > 0) {
      return this.OrderServices.createOrder(OrderData);
    } else {
      return '数据不能为空';
    }
  }
  // 更新订单
  @Post('UpdateOrder')
  update(@Body() Body: { houseId: number }) {
    return this.OrderServices.updateOrder(Body);
  }
  // 删除订单
  @Post()
  remove(@Body() houseId: number) {
    return this.OrderServices.deleteOrder(houseId);
  }
}
