import { DataSource } from 'typeorm';
import { AllOrder } from './Entity/Order/order.entity';

export const OrderDataSource = new DataSource({
  type: 'mysql',
  host: '47.122.47.101',
  port: 3306,
  username: 'root',
  password: '1989315788',
  database: 'Order',
  entities: [AllOrder],
});
