import { Resource } from '../Entity/HouseResource/resource.entity';
import { DataSource } from 'typeorm';

export const qqDataSource = new DataSource({
  type: 'mysql',
  host: '47.122.47.101',
  port: 3306,
  username: 'root',
  password: '1989315788',
  database: 'resourcehouse',
  entities: [Resource],
});
