import { Injectable } from '@nestjs/common';
import { AllOrder } from '../Entity/Order/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { orderDataType } from './type/orderData';
import { RedisService } from '../redis';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { OssService } from '../OSS/oss';

interface OrderQueueJob {
  houseId: number;
  userid: number;
}
@Injectable()
export class OrderService {
  constructor(
    private readonly ossService: OssService,
    @InjectRepository(AllOrder, 'order')
    private readonly OrderRepository: Repository<AllOrder>,
    // redis缓存
    private readonly redisService: RedisService,
    // 创建队列
    @InjectQueue('order')
    private readonly orderQueue: Queue<OrderQueueJob>,
  ) {}
  //  获取所有订单
  async findAllOrder(Overall: number, UserId: number) {
    const Order = this.OrderRepository.createQueryBuilder('Order')
      .where('Order.Overall = :Overall', { Overall })
      .andWhere('Order.userid = :userid', { userid: UserId })
      .getMany();
    // 合并数据url
    const GetOrderMergeUrl = async () => {
      const [ossImages, SelectedDataLists] = await Promise.all([
        // 获取oss图片列表
        this.ossService.listImagesInFolder('img/NestImgs/'),
        // 获取数据库数据
        Order,
      ]);
      if (SelectedDataLists) {
        const Selected = SelectedDataLists.map((item) => {
          console.log(item.houseId);
          return {
            ...item,
            url: ossImages[item.houseId - 1],
          };
        });
        return {
          SelectedS: Selected,
        };
      }
    };
    const formatDate = (startDate: Date, endDate: Date) => {
      const formatSingleDate = (date: Date) => {
        const weekDays = [
          '周日',
          '周一',
          '周二',
          '周三',
          '周四',
          '周五',
          '周六',
        ];
        date = new Date(date);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const weekDay = weekDays[date.getDay()];
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return {
          dateStr: `${date.getFullYear()}年${month}月${day}日`,
          weekDay,
          time: `${hours}:${minutes}`,
        };
      };

      const startDateInfo = formatSingleDate(startDate);
      const endDateInfo = formatSingleDate(endDate);

      return {
        startDate: startDateInfo,
        endDate: endDateInfo,
      };
    };
    // 合并所有数据
    const orderData = await GetOrderMergeUrl();
    const orders =
      orderData?.SelectedS?.map((item) => {
        const { startDate, endDate } = formatDate(
          new Date(item.StartTime),
          new Date(item.EndTime),
        );
        return {
          ...item,
          StartTime: startDate.dateStr,
          StartTimeWeek: startDate.weekDay,
          StartTimeTime: startDate.time,
          EndTime: endDate.dateStr,
          EndTimeWeek: endDate.weekDay,
          EndTimeTime: endDate.time,
        };
      }) || [];
    return orders;
  }
  //  获取近期的订单
  async findCompletedOrder(UserId: number) {
    const CompletedOrder = this.OrderRepository.createQueryBuilder('Order')
      .where('Order.Overall = :Overall', { Overall: 1 })
      .andWhere('Order.userid = :userid', { userid: UserId })
      .getMany();
    // 合并数据url
    const GetOrderMergeUrl = async () => {
      const [ossImages, SelectedDataLists] = await Promise.all([
        // 获取oss图片列表
        this.ossService.listImagesInFolder('img/NestImgs/'),
        // 获取数据库数据
        CompletedOrder,
      ]);
      if (SelectedDataLists) {
        const Selected = SelectedDataLists.map((item) => {
          return {
            ...item,
            url: ossImages[item.houseId - 1],
          };
        });
        return {
          SelectedS: Selected,
        };
      }
    };
    // 转化日期
    const formatDate = (startDate: Date, endDate: Date) => {
      const formatSingleDate = (date: Date) => {
        const weekDays = [
          '周日',
          '周一',
          '周二',
          '周三',
          '周四',
          '周五',
          '周六',
        ];
        date = new Date(date);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const weekDay = weekDays[date.getDay()];
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return {
          dateStr: `${date.getFullYear()}年${month}月${day}日`,
          weekDay,
          time: `${hours}:${minutes}`,
        };
      };

      const startDateInfo = formatSingleDate(startDate);
      const endDateInfo = formatSingleDate(endDate);

      return {
        startDate: startDateInfo,
        endDate: endDateInfo,
      };
    };
    // 合并所有数据
    const orderData = await GetOrderMergeUrl();
    const newCompletedOrder =
      orderData?.SelectedS.map((item) => {
        const { startDate, endDate } = formatDate(item.StartTime, item.EndTime);
        return {
          ...item,
          StartTime: startDate.dateStr,
          StartTimeWeek: startDate.weekDay,
          StartTimeTime: startDate.time,
          EndTime: endDate.dateStr,
          EndTimeWeek: endDate.weekDay,
          EndTimeTime: endDate.time,
        };
      }) || [];
    // 前10天的日期内的订单
    function isDateInLast10Days(targetDateStr: string | number | Date) {
      // 声明目标日期变量
      let targetDate: Date;

      // 根据输入参数类型进行不同的处理
      if (targetDateStr instanceof Date) {
        // 如果是Date类型，直接使用
        targetDate = targetDateStr;
      } else if (typeof targetDateStr === 'string') {
        // 如果是字符串类型，尝试解析中文日期格式
        const dateParts = targetDateStr.match(
          /(\d{4})年(\d{1,2})月(\d{1,2})日/,
        );
        if (dateParts) {
          // 如果匹配到中文日期格式，转换为标准日期格式
          targetDate = new Date(
            `${dateParts[1]}-${dateParts[2]}-${dateParts[3]}`,
          );
        } else {
          // 如果不是中文日期格式，直接创建Date对象
          targetDate = new Date(targetDateStr);
        }
      } else {
        // 其他类型直接创建Date对象
        targetDate = new Date(targetDateStr);
      }

      // 解析今天的日期（注意：避免时区影响，建议使用 UTC 时间）
      const today = new Date();
      today.setHours(0, 0, 0, 0); // 重置为当天0点，避免时分秒干扰

      // 计算10天前的日期（毫秒级计算：1天 = 24*60*60*1000 毫秒）
      const tenDaysAgo = new Date(today);
      tenDaysAgo.setDate(today.getDate() - 10); // 减去10天

      // 判断目标日期是否在 [tenDaysAgo, today) 范围内
      return targetDate >= tenDaysAgo && targetDate <= today;
    }
    const newCompletedOrders = newCompletedOrder.map((item) => {
      if (isDateInLast10Days(item.StartTime)) {
        return {
          ...item,
        };
      }
    });

    return newCompletedOrders;
  }
  //  获取待支付的订单
  async findWaitingOrder(UserId: number) {
    const WaitingOrder = this.OrderRepository.createQueryBuilder('Order')
      .where('Order.Overall = :Overall', { Overall: 0 })
      .andWhere('Order.userid = :userid', { userid: UserId })
      .getMany();
    if ((await WaitingOrder).length <= 0) return;
    // 获取当前redis时间
    const waitingOrders = await WaitingOrder;
    const time = await this.redisService.ttl(
      `order${waitingOrders[0].houseId}userid:${waitingOrders[0].userid}`,
    );
    console.log(time, waitingOrders[0]?.houseId);
    // 转化日期
    const formatDate = (startDate: Date, endDate: Date) => {
      const formatSingleDate = (date: Date) => {
        const weekDays = [
          '周日',
          '周一',
          '周二',
          '周三',
          '周四',
          '周五',
          '周六',
        ];
        date = new Date(date);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const weekDay = weekDays[date.getDay()];
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return {
          dateStr: `${date.getFullYear()}年${month}月${day}日`,
          weekDay,
          time: `${hours}:${minutes}`,
        };
      };

      const startDateInfo = formatSingleDate(startDate);
      const endDateInfo = formatSingleDate(endDate);

      return {
        startDate: startDateInfo,
        endDate: endDateInfo,
      };
    };
    //  整理数据返回新的数据
    const newWaitingOrder = (await WaitingOrder).map((item) => {
      const { startDate, endDate } = formatDate(item?.StartTime, item.EndTime);
      return {
        ...item,
        StartTime: startDate.dateStr,
        StartTimeWeek: startDate.weekDay,
        StartTimeTime: startDate.time,
        EndTime: endDate.dateStr,
        EndTimeWeek: endDate.weekDay,
        EndTimeTime: endDate.time,
        time: Math.floor(time / 60), // Convert seconds to minutes
      };
    });
    return newWaitingOrder;
  }
  // 创建订单
  async createOrder(OrderData: orderDataType) {
    const Data = await this.OrderRepository.createQueryBuilder('Order')
      .where('Order.houseId = :houseId', { houseId: OrderData.houseId })
      .andWhere('Order.Overall = :Overall', { Overall: OrderData.Overall })
      .andWhere('Order.userid = :userid', { userid: OrderData.userid })
      .getMany();
    console.log(
      Data.length > 0,
      Data.some((item) => item.houseId === OrderData.houseId),
    );
    // 判断有没有登录
    if (!OrderData.userid) {
      return {
        code: 401,
        message: '未登录',
        success: false,
      };
    }
    // 判断是否有未支付的订单
    if (
      Data.length > 0 &&
      Data.some((item) => item.houseId === OrderData.houseId)
    ) {
      return {
        code: 400,
        message: '该房屋已有相关订单，请勿重复创建',
        success: false,
      };
    }

    // 创建订单
    await this.OrderRepository.insert(OrderData);
    // 缓存到redis
    await this.redisService.set(
      `order${OrderData.houseId}userid:${OrderData.userid}`,
      OrderData,
      1800,
    );
    // 获取当前任务redis时间
    const time = await this.redisService.ttl(
      `order${OrderData.houseId}userid:${OrderData.userid}`,
    );
    // 添加延迟任务到队列
    await this.orderQueue.add(
      'cancelOrder',
      {
        houseId: OrderData.houseId,
        userid: OrderData.userid,
      },
      {
        delay: time * 1000,
        attempts: 2,
        removeOnComplete: true,
        jobId: `cancelOrder_${OrderData.userid}`,
      },
    );

    return {
      code: 200,
      message: '已完成预约!',
    };
  }
  // 更新订单
  async updateOrder(Body: { houseId: number; UserId: number }) {
    const UpOrder = await this.OrderRepository.createQueryBuilder('Order')
      .where('Order.houseId = :houseId', { houseId: Body.houseId })
      .andWhere('Order.Overall = :Overall', { Overall: 0 })
      .andWhere('Order.userid = :userid', { userid: Body.UserId })
      .getMany();

    // 有值才更新
    if (UpOrder.length > 0 && Body.houseId) {
      await this.OrderRepository.update(
        { houseId: Body.houseId, Overall: 0 },
        { Overall: 1 },
      );
      // 删除延迟取消任务(Bull队列任务)
      await this.orderQueue.removeJobs(`cancelOrder_${Body.UserId}`);
      await this.redisService.del(`order${Body.houseId}userid:${Body.UserId}`);
      await this.redisService.del(`bull:order:cancelOrder_${Body.UserId}`);
      // 优化：仅删除当前用户的延迟任务
      await this.orderQueue.getDelayed().then((jobs) => {
        const userJobs = jobs.filter(
          (job) => job.name === `cancelOrder_${Body.UserId}`,
        );
        return Promise.all(userJobs.map((job) => job.remove()));
      });

      return {
        code: 200,
        message: '订单已更新',
      };
    }

    return {
      code: 400,
      message: '未找到相关订单',
    };
  }
  // 删除订单
  async deleteOrder(houseId: number, userid: number) {
    const deleteOrders = await this.OrderRepository.delete({
      houseId,
      Overall: 0,
      userid,
    });
    // 判断是否有行被删除
    if (deleteOrders?.affected && deleteOrders.affected > 0) {
      return {
        code: 200,
        message: '订单已删除',
      };
    }
    return {
      code: 400,
      message: '未找到相关订单',
    };
  }
}
